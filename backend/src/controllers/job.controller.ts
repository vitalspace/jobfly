import { jwt } from "@elysiajs/jwt";
import { Elysia, error, t } from "elysia";
import { Job } from "../models/job.model";
import { User } from "../models/user.model";

interface IJob {
  title: string;
  company: string;
  employment: string;
  location: string;
  salary: number;
  description: string;
  inthisrole: string;
  skills: string;
  level: string;
}

export const jobRoutes = new Elysia({
  prefix: "/jobs",
  detail: {},
  tags: ["job"],
})
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT || "Bun is a Great RunTiM3",
    })
  )
  .post(
    "/create",
    async ({ jwt, body, cookie: { auth } }) => {
      try {
        if (!auth) return error(401, "Unauthorized");
        const user = await jwt.verify(auth.value);

        if (!user || typeof user.id !== "string")
          return error(401, "Unauthorized");

        const {
          title,
          company,
          employment,
          location,
          salary,
          description,
          inthisrole,
          skills,
          level,
        }: IJob = body;

        const job = new Job({
          title,
          company,
          employment,
          location,
          salary,
          description,
          inthisrole,
          skills,
          recruiter: user.id,
          level,
        });

        await job.save();
        return { message: "The job has been successfully published" };
      } catch (err) {
        return error(500, { message: `Internal serrver error ${err}` });
      }
    },
    {
      body: t.Object({
        title: t.String({
          minLength: 10,
        }),
        company: t.String({
          minLength: 10,
        }),
        employment: t.String(),
        location: t.String(),
        salary: t.Number(),
        description: t.String({
          minLength: 10,
        }),
        inthisrole: t.String({
          minLength: 10,
        }),
        skills: t.String({
          minLength: 10,
        }),
        level: t.String({
          minLength: 2,
        }),
      }),
    }
  )

  .put(
    "/:id",
    async ({ jwt, body, params, cookie: { auth } }) => {
      try {
        const { id } = params;

        if (!auth) return error(401, "Unauthorized");
        const token = await jwt.verify(auth.value);

        if (!token) return error(401, "Unauthorized");

        const user = await User.findOne({ _id: token.id });

        if (!user) return error(404, { message: "User not found" });

        const job = await Job.findOne({ _id: id });

        if (!job) return error(404, { message: "Job not found" });

        //@ts-ignore
        if (user._id.toString() !== job.recruiter.toString())
          return error(401, {
            message: `You are not authorized to modify this job.`,
          });

        const updateJob = await Job.findByIdAndUpdate(
          { _id: id },
          { $set: { ...body } },
          { new: true }
        );

        if (!updateJob)
          return error(404, { message: `No task Job with the ID: ${id}` });

        return { message: "Job updated successfully" };
      } catch (err) {
        return error(500, { message: `Internal server error: ${err}` });
      }
    },
    {
      body: t.Object({
        title: t.String({
          minLength: 10,
        }),
        company: t.String({
          minLength: 10,
        }),
        employment: t.String(),
        location: t.String(),
        salary: t.Number(),
        description: t.String({
          minLength: 10,
        }),
        inthisrole: t.String({
          minLength: 10,
        }),
        skills: t.String({
          minLength: 10,
        }),
        level: t.String({
          minLength: 2,
        }),
      }),
    }
  )

  .get("/", async ({ jwt, cookie: { auth } }) => {
    try {
      if (!auth) return error(401, "Unauthorized");

      const user = await jwt.verify(auth.value);

      if (!user || typeof user.id !== "string")
        return error(401, "Unauthorized");

      const jobs = await Job.find();
      return { jobs };
    } catch (err) {
      return error(500, { message: `Internal server error: ${err}` });
    }
  })

  .get("/:id", async ({ jwt, params, cookie: { auth } }) => {
    try {
      if (!auth) return error(401, "Unauthorized");

      const user = await jwt.verify(auth.value);

      if (!user || typeof user.id !== "string")
        return error(401, "Unauthorized");

      const { id } = params;

      const job = await Job.findOne({ _id: id });

      if (!job) return error(404, { message: `No job found with ID: ${id}` });

      return { job };
    } catch (err) {
      return error(500, { message: `Internal server error: ${err} ` });
    }
  })

  .get("/:id/applicants", async ({ jwt, params, cookie: { auth } }) => {
    try {
      if (!auth) return error(401, "Unauthorized");

      const token = await jwt.verify(auth.value);

      if (!token || typeof token.id !== "string")
        return error(401, "Unauthorized");

      const user = await User.findOne({ _id: token.id });
      if (!user)
        return error(404, { message: `No user found with ID: ${token.id}` });

      const { id } = params;

      const job = await Job.findOne({ _id: id });

      if (!job) return error(404, { message: `No job found with ID: ${id}` });

      //@ts-ignore

      if (user._id.toString() !== job.recruiter.toString())
        return error(401, {
          message: `You are not authorized to see the list of applicants for this job.`,
        });

      const applicants = await User.find({
        _id: { $in: job.applicants },
      }).select("fullname email");

      return { applicants };
    } catch (err) {
      return error(500, { message: `Internal server error: ${err} ` });
    }
  });
