import { jwt } from "@elysiajs/jwt";
import { Elysia, error, t } from "elysia";
import { User } from "../models/user.model";
import { Job } from "../models/job.model";

import { type IUser, IJob } from "../types/types.d";

export const userRoutes = new Elysia({
  detail: {
    tags: ["users"],
  },
})
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT || "Bun is a Great RunTiM3",
    })
  )
  .post(
    "/signup",
    async ({ body }) => {
      try {
        const {
          fullname,
          age,
          location,
          rol,
          email,
          password,
          phone,
        }: Partial<IUser> = body;

        const existedUser = await User.findOne({
          $or: [{ email }, { phone }],
        });

        if (existedUser) return error(409, { message: "User already exists" });

        const hashPassword = await Bun.password.hash(password);

        const user = new User({
          fullname,
          email,
          age,
          password: hashPassword,
          location,
          rol,
          phone,
        });
        await user.save();
        return { message: "User created successfully" };
      } catch (err) {
        return error(500, { message: `Internal server error ${err}` });
      }
    },
    {
      body: t.Object({
        fullname: t.String({
          minLength: 8,
        }),
        age: t.Number({
          minimum: 18,
        }),
        location: t.String(),
        rol: t.String(),
        phone: t.String({
          minLength: 10,
        }),
        email: t.String({
          format: "email",
        }),
        password: t.String({
          minLength: 8,
        }),
      }),
    }
  )

  .post(
    "/signin",
    async ({ body, jwt, cookie: { auth } }) => {
      try {
        const { email, password }: Partial<IUser> = body;

        const user = await User.findOne({
          $or: [{ email }],
        });

        if (!user) return error(404, { message: "Invalid email or password" });

        const istPasswordCorrect = await Bun.password.verify(
          password,
          user.password
        );

        if (!istPasswordCorrect)
          return error(404, { message: "Invalid email or password" });

        auth.set({
          value: await jwt.sign({
            //@ts-ignore
            id: user._id,
            fullname: user.fullname,
            email: user.email,
          }),
          // httpOnly: true,
          maxAge: 7 * 86400,
          path: "/",
        });

        return { token: auth.value };
      } catch (err) {
        return error(500, { message: `Internal server error ${err}` });
      }
    },
    {
      body: t.Object({
        email: t.String({
          format: "email",
        }),

        password: t.String({
          minLength: 8,
        }),
      }),
    }
  )

  .put(
    "/update",
    async ({ jwt, body, cookie: { auth } }) => {
      try {
        if (!auth) return error(401, "Unauthorized");
        const profile = await jwt.verify(auth.value);

        if (!profile || typeof profile.id !== "string")
          return error(401, "Unauthorized");

        const updatedUser = await User.findByIdAndUpdate(
          { _id: profile.id },
          { $set: { ...body } },
          { new: true }
        )
          .select("-password")
          .select("-_id")
          .select("-_id")
          .select("-createdAt")
          .select("-updatedAt")
          .select("-__v");

        if (!updatedUser)
          return error(404, `User with id ${profile.id} was not found`);

        return JSON.stringify(updatedUser);
      } catch (err) {
        return error(500, { message: `Internal server error #${err}` });
      }
    },
    {
      body: t.Object({
        avatar: t.String(),
        fullname: t.String({
          minLength: 8,
        }),
        age: t.Number({
          minimum: 18,
        }),
        location: t.String(),
        phone: t.String({
          minLength: 10,
        }),
        email: t.String({
          format: "email",
        }),
      }),
    }
  )

  .get("/profile", async ({ jwt, cookie: { auth } }) => {
    try {
      if (!auth) return error(401, "Unauthorized");

      const token = await jwt.verify(auth.value);

      if (!token) return error(401, "Unauthorized");

      const user = await User.findById({ _id: token.id })
        .select("-password")
        .select("-__v");

      if (!user) return error(404, { message: "User not found" });

      return {
        user,
      };
    } catch (err) {
      return error(500, { message: `Internal server error ${err}` });
    }
  })

  .post(
    "/apply",
    async ({ jwt, body, cookie: { auth } }) => {
      try {
        const { id } = body;

        if (!auth) return error(401, "Unauthorized");

        const token = await jwt.verify(auth.value);
        if (!token) return error(401, "Unauthorized");

        //@ts-ignore
        const user: Partial<IUser> = await User.findById({ _id: token.id });
        if (!user) return error(404, { message: "User not found" });

        //@ts-ignore
        if (user.applications?.includes(id))
          return error(409, {
            message: "You have already applied to this job",
          });
        //@ts-ignore
        user.applications?.push(id);
        //@ts-ignore
        await user.save();

        //@ts-ignore
        const job: Partial<IJob> = await Job.findById({ _id: id });
        if (!job) return error(404, { message: "Job not found" });
        //@ts-ignore
        if (job.applicants?.includes(user._id))
          return error(409, {
            message: "You have already applied to this job",
          });
        //@ts-ignore

        job.applicants?.push(user._id);
        //@ts-ignore
        await job.save();

        return { message: "You have applied to this job correctly" };
      } catch (err) {
        return error(500, { message: `Internal server error ${err}` });
      }
    },
    {
      body: t.Object({
        id: t.String(),
      }),
    }
  )

  .post("/unapply", async ({ jwt, body, cookie: { auth } }) => {
    try {
      //@ts-ignore
      const { id } = body;

      if (!auth) error(401, "Unauthorized");

      const token = await jwt.verify(auth.value);
      if (!token) return error(401, "Unauthorized");

      const user = await User.findById({ _id: token.id });
      if (!user) return error(404, { message: "User not found" });

      if (!user.applications.includes(id)) {
        return error(409, {
          message: "You haven't applied to this job yet",
        });
      }

      user.applications?.splice(user.applications.indexOf(id), 1);
      await user.save();

      //@ts-ignore
      const job: Partial<IJob> = await Job.findById({ _id: id });
      if (!job) return error(404, { message: "Job not found" });
      //@ts-ignore
      if (!job.applicants?.includes(user._id))
        return error(409, {
          message: "You haven't applied to this job yet",
        });
      //@ts-ignore
      job.applicants?.splice(job.applicants.indexOf(user._id), 1);
      //@ts-ignore
      await job.save();

      return { message: "You have unapplied from this job correctly" };
    } catch (err) {
      return error(500, { message: `Internal server error: ${err}` });
    }
  })

  .post(
    "/savejob",
    async ({ jwt, body, cookie: { auth } }) => {
      try {
        const { id } = body;

        if (!auth) return error(401, "Unauthorized");

        const token = await jwt.verify(auth.value);
        if (!token) return error(401, "Unauthorized");

        //@ts-ignore
        const user: Partial<IUser> = await User.findById({ _id: token.id });
        if (!user) return error(404, { message: "User not found" });

        //@ts-ignore
        if (user.savedJobs.includes(id))
          return error(409, {
            message: "You have already saved this job",
          });
        //@ts-ignore
        user.savedJobs.push(id);
        //@ts-ignore
        await user.save();

        return { message: "You have saved to this job correctly" };
      } catch (err) {
        return error(500, { message: `Internal server error ${err}` });
      }
    },
    {
      body: t.Object({
        id: t.String(),
      }),
    }
  )

  .post(
    "/unsavedjob",
    async ({ jwt, body, cookie: { auth } }) => {
      try {
        const { id } = body;

        if (!auth) return error(401, "Unauthorized");

        const token = await jwt.verify(auth.value);
        if (!token) return error(401, "Unauthorized");

        //@ts-ignore
        const user: Partial<IUser> = await User.findById({ _id: token.id });
        if (!user) return error(404, { message: "User not found" });

        //@ts-ignore
        if (!user.savedJobs.includes(id))
          return error(409, {
            message: "You haven't saved this job yet",
          });
        //@ts-ignore
        user.savedJobs = user.savedJobs.filter(
          (savedId: string) => savedId.toString() !== id.toString()
        );

        //@ts-ignore
        await user.save();

        return {
          message: "You have removed this job from your saved list correctly",
        };
      } catch (err) {
        return error(500, { message: `Internal server error ${err}` });
      }
    },
    {
      body: t.Object({
        id: t.String(),
      }),
    }
  )

  .get("/getmyjobs", async ({ jwt, cookie: { auth } }) => {
    try {
      if (!auth) return error(401, "Unauthorized");

      const token = await jwt.verify(auth.value);

      if (!token || typeof token.id !== "string")
        return error(401, "Unauthorized");

      const user = await User.findOne({ _id: token.id });

      if (!user) return error(404, { message: "User not found" });

      if (user.rol === "Recruiter") {
        const jobs = await Job.find({ recruiter: user._id });
        return { jobs };
      } else {
        const jobs = await Job.find({ applicants: { $in: [user._id] } });
        return { jobs };
      }
    } catch (err) {
      return error(500, { message: `Internal server error: ${err} ` });
    }
  });
