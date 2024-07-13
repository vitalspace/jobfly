<script lang="ts">
  import { AxiosError } from "axios";
  import { z } from "zod";
  import {
    type FormSchema,
    signUpFormSchema,
  } from "../schemas/singUpFormSchema";
  import { type UserData } from "../types/types.d";
  import { signIn } from "../services/user.services";

  let formData: Partial<UserData> = {
    email: "",
    password: "",
  };

  let errors: Partial<FormSchema> = {};

  async function handleFormSubmission() {
    try {
      signUpFormSchema.parse(formData);
      errors = {};
      const { data } = await signIn(formData);
      console.log(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors = error.formErrors.fieldErrors as Partial<FormSchema>;
        console.log(errors);
      } else if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    }
  }
</script>

<div class="p-4">
  <form class="grid gap-y-4" on:submit|preventDefault={handleFormSubmission}>
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
  </form>
</div>
