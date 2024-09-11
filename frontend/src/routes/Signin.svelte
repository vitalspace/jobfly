<script lang="ts">
  import { AxiosError } from "axios";
  import { z } from "zod";
  import { type FormSchema, formSchema } from "../schemas/singInSchema";
  import { signIn } from "../services/user.services";
  import { type IUser } from "../types/types.d";
  import { navigate } from "svelte-routing";
  import Toast from "../components/Toast.svelte";
  import { auth } from "../stores/auth.store";

  let formData: Partial<IUser> = {
    email: "",
    password: "",
  };

  let errors: Partial<FormSchema> = {};

  let message = "";
  let toastStatus = false;
  const TOAST_DURATION = 3000;
  let toastIcon: "success" | "error" = "success";

  const showToast = (icon: "success" | "error", msg: string) => {
    toastStatus = true;
    toastIcon = icon;
    message = msg;
    setTimeout(() => (toastStatus = false), TOAST_DURATION);
  };

  async function handleFormSubmission() {
    try {
      formSchema.parse(formData);
      errors = {};
      const { data } = await signIn(formData);
      auth.login(data.token);
      showToast("success", "Bienvenido papito");
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors = error.formErrors.fieldErrors as Partial<FormSchema>;
      } else if (error instanceof AxiosError) {
        // console.log(error.response?.data);
        showToast("error", error.response?.data.message);
      }
    }
  }
</script>

<Toast {toastStatus} {toastIcon} {message} />

<div class="p-4 grid gap-y-4 place-items-center h-screen">
  <form class="grid gap-y-4 w-full " on:submit|preventDefault={handleFormSubmission}>
    <div class="text-center text-4xl">Sign In</div>

    <div class="grid gap-y-1">
      <label for="email" class="prompt-extralight text-xs text-[#4a485d]"
        >Email</label
      >
      <input
        type="text"
        name="email"
        class="prompt-extralight rounded-xl border py-2 pl-2 text-[#4a485d]"
        bind:value={formData.email}
      />
      {#if errors.email}
        <p class="text-red-500 prompt-extralight text-xs">{errors.email}</p>
      {/if}
    </div>

    <div class="grid gap-y-1">
      <label for="password" class="prompt-extralight text-xs text-[#4a485d]"
        >Password</label
      >
      <input
        type="password"
        name="password"
        class="prompt-extralight rounded-xl border py-2 pl-2 text-[#4a485d]"
        bind:value={formData.password}
      />
      {#if errors.password}
        <p class="text-red-500 prompt-extralight text-xs">{errors.password}</p>
      {/if}
    </div>

    <button
      class="prompt-semibold rounded-xl bg-[#242240] py-3 text-base text-white"
      >Submit</button
    >

    <div>
      <p class="text-center">
        No have an account? <a class="prompt-semibold text-md text-[#242240]" href="/signup"
          >Sign Up</a
        >
      </p>
    </div>
  </form>
</div>
