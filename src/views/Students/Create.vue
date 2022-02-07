<template>
  <v-form v-model="valid" ref="form">
    <v-container>
      <v-card elevation="6" shaped>
        <div class="card-header pa-4 deep-purple white--text">
          Create New Student
        </div>
        <div class="pa-4">
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="form.firstname"
                :rules="firstNameRules"
                :counter="10"
                label="First name"
                required
                outlined
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-text-field
                v-model="form.lastname"
                :rules="lastNameRules"
                :counter="10"
                label="Last name"
                required
                outlined
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-text-field
                v-model="form.age"
                type="number"
                :rules="ageRules"
                label="Age"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="submit"
          >
            Submit
          </v-btn>
        </div>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import Student from "../../classes/student";

export default {
  name: "Create",
  data: () => ({
    valid: false,
    form: {
      firstname: "",
      lastname: "",
      age: "",
    },
    firstNameRules: [
      (v) => !!v || "First name is required",
      (v) => v.length <= 50 || "Name must be less than 10 characters",
    ],
    lastNameRules: [
      (v) => !!v || "Last name is required",
      (v) => v.length <= 50 || "Name must be less than 10 characters",
    ],
    ageRules: [
      (v) => !!v || "Age is required",
      (v) => /^\d+/.test(v) || "Age must be number",
    ],
  }),
  methods: {
    submit() {
      Student.insert({ data: this.form });
      this.resetForm();
      this.$router.push({ name: "Students" });
    },
    resetForm() {
      this.$refs.form.reset();
    },
  },
};
</script>
