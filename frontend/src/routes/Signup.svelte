<script lang="ts">
  import { AxiosError } from "axios";
  import { z } from "zod";
  import { type FormSchema, formSchema } from "../schemas/singUpSchema";
  import { type IUser } from "../types/types.d";
  import { signUp } from "../services/user.services";
  import Toast from "../components/Toast.svelte";
  import { navigate } from "svelte-routing";
  import MultiSelect from "svelte-multiselect";
  import { countries } from "../lib/countries";
  import { rol } from "../lib/rol";

  let formData: IUser = {
    fullname: "",
    age: 18,
    location: "",
    rol: "",
    phone: "",
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

  async function handleFormSubmission(e: Event) {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario
    try {
      formSchema.parse(formData);
      errors = {};
      const { data } = await signUp(formData);
      showToast("success", data.message);
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors = error.formErrors.fieldErrors as Partial<FormSchema>;
        console.log(errors);
      } else if (error instanceof AxiosError) {
        // console.log(error);
        showToast("error", error.response?.data.message);
      }
    }
  }
</script>

<Toast {toastStatus} {toastIcon} {message} />

<div class="p-4 grid gap-y-4">
  <form class="grid gap-y-4">
    <div class="grid gap-y-1">
      <label for="fullname" class="prompt-extralight text-xs text-[#4a485d]"
        >Full Name</label
      >
      <input
        type="text"
        name="fullname"
        class="prompt-extralight rounded-xl border border-[lightgray] py-2 pl-2 text-[#4a485d]"
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
        class="prompt-extralight rounded-xl border border-[lightgray] py-2 pl-2 text-[#4a485d]"
        bind:value={formData.age}
      />
      {#if errors.age}
        <p class="text-red-500 prompt-extralight text-xs">{errors.age}</p>
      {/if}
    </div>

    <div class="grid gap-y-1">
      <label for="phone" class="prompt-extralight text-xs text-[#4a485d]"
        >Phone</label
      >
      <input
        type="text"
        name="phone"
        class="prompt-extralight rounded-xl border py-2 pl-2 border-[lightgray] text-[#4a485d]"
        bind:value={formData.phone}
      />
      {#if errors.phone}
        <p class="text-red-500 prompt-extralight text-xs">{errors.phone}</p>
      {/if}
    </div>

    <div class="grid gap-y-1">
      <label for="location" class="prompt-extralight text-xs text-[#4a485d]"
        >Rol</label
      >
      <MultiSelect
        options={rol}
        required={1}
        minSelect={1}
        maxSelect={1}
        selected={[`Candidate`]}
        --sms-padding="0.5rem"
        --sms-border-radius="0.75rem"
        --sms-selected-bg="#242240"
        --sms-selected-text-color="white"
        liSelectedClass="text-xs font-[prompt-extralight]"
        bind:value={formData.rol}
      />
      {#if errors.rol}
        <p class="text-red-500 prompt-extralight text-xs">{errors.rol}</p>
      {/if}
    </div>

    <div class="grid gap-y-1">
      <label for="location" class="prompt-extralight text-xs text-[#4a485d]"
        >Location</label
      >
      <MultiSelect
        options={countries}
        required={1}
        minSelect={1}
        maxSelect={1}
        selected={[`United States`]}
        --sms-padding="0.5rem"
        --sms-border-radius="0.75rem"
        --sms-selected-bg="#242240"
        --sms-selected-text-color="white"
        liSelectedClass="text-xs font-[prompt-extralight]"
        bind:value={formData.location}
      />
      {#if errors.location}
        <p class="text-red-500 prompt-extralight text-xs">{errors.location}</p>
      {/if}
    </div>

    <div class="grid gap-y-1">
      <label for="email" class="prompt-extralight text-xs text-[#4a485d]"
        >Email</label
      >
      <input
        type="text"
        name="email"
        class="prompt-extralight rounded-xl border py-2 pl-2 border-[lightgray] text-[#4a485d]"
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
        class="prompt-extralight rounded-xl border py-2 pl-2 border-[lightgray] text-[#4a485d]"
        bind:value={formData.password}
      />
      {#if errors.password}
        <p class="text-red-500 prompt-extralight text-xs">{errors.password}</p>
      {/if}
    </div>

    <button
      on:click={handleFormSubmission}
      class="prompt-semibold rounded-xl bg-[#242240] py-3 text-base text-white"
      >Submit</button
    >
  </form>

  <div class="text-center">
    <p class="prompt-extralight">or</p>
  </div>

  <div class="text-center">
    <a class="prompt-semibold text-md text-[#242240]" href="/signin">Sign In</a>
  </div>
</div>
