import { jwt } from "@elysiajs/jwt";
import { Elysia, error, t } from "elysia";
import { User } from "../models/user.model";

interface IUser {
  fullname: string;
  age: number;
  location: string;
  email: string;
  phone: string;
  password: string;
}

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
        const { fullname, age, location, email, password, phone }: IUser = body;

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
  .get("/profile", async ({ jwt, cookie: { auth } }) => {
    try {
      if (!auth) return error(401, "Unauthorized");

      const token = await jwt.verify(auth.value);

      if (!token) return error(401, "Unauthorized");

      const user = await User.findById({ _id: token.id });

      if (!user) return error(404, { message: "User not found" });

      return {
        avatar: user.avatar,
        fullname: user.fullname,
        age: user.age,
        email: user.email,
        phone: user.phone,
        location: user.location,
      };
    } catch (err) {
      return error(500, { message: `Internal server error ${err}` });
    }
  });
