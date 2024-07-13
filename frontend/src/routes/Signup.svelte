<script lang="ts">
  import { AxiosError } from "axios";
  import { z } from "zod";
  import {
    type FormSchema,
    signUpFormSchema,
  } from "../schemas/singUpFormSchema";
  import { type UserData } from "../types/types.d";
  import { signUp } from "../services/user.services";

  let formData: UserData = {
    fullname: "",
    age: null,
    location: "",
    phone: "",
    email: "",
    password: "",
  };

  let errors: Partial<FormSchema> = {};

  async function handleFormSubmission() {
    try {
      signUpFormSchema.parse(formData);
      errors = {};
      const { data } = await signUp(formData);
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
      <label for="fullname" class="prompt-extralight text-xs text-[#4a485d]"
        >Full Name</label
      >
      <input
        type="text"
        name="fullname"
        class="prompt-extralight rounded-xl border py-2 pl-2 text-[#4a485d]"
        bind:value={formData.fullname}
      />
      {#if errors.fullname}
        <p class="text-red-500 prompt-extralight text-xs">{errors.fullname}</p>
      {/if}
    </div>

    <div class="grid gap-y-1">
      <label for="age" class="prompt-extralight text-xs text-[#4a485d]"
        >Age</label
      >
      <input
        type="number"
        name="age"
        class="prompt-extralight rounded-xl border py-2 pl-2 text-[#4a485d]"
        bind:value={formData.age}
      />
      {#if errors.age}
        <p class="text-red-500 prompt-extralight text-xs">{errors.age}</p>
      {/if}
    </div>

    <div class="grid gap-y-1">
      <label for="location" class="prompt-extralight text-xs text-[#4a485d]"
        >Location</label
      >
      <input
        type="text"
        name="location"
        class="prompt-extralight rounded-xl border py-2 pl-2 text-[#4a485d]"
        bind:value={formData.location}
      />
      {#if errors.location}
        <p class="text-red-500 prompt-extralight text-xs">{errors.location}</p>
      {/if}
    </div>

    <div class="grid gap-y-1">
      <label for="phone" class="prompt-extralight text-xs text-[#4a485d]"
        >Phone</label
      >
      <input
        type="text"
        name="phone"
        class="prompt-extralight rounded-xl border py-2 pl-2 text-[#4a485d]"
        bind:value={formData.phone}
      />
      {#if errors.phone}
        <p class="text-red-500 prompt-extralight text-xs">{errors.phone}</p>
      {/if}
    </div>

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
