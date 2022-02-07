<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="students"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Students</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="success" dark class="mb-2" link to="students/create">
            New Student
          </v-btn>
        </v-toolbar>
        <v-dialog v-model="dialogDelete" max-width="600px">
          <v-card class="pa-2">
            <v-card-title class="text-h5">delete Student</v-card-title>
            <v-card-text
              >Are you sure you want to delete this student?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="closeDelete"
                >Cancel
              </v-btn>
              <v-btn color="green darken-1" text @click="deleteItemConfirm"
                >OK
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Edit Student</span>
            </v-card-title>

            <v-card-text>
              <v-form v-model="valid" ref="form">
                <v-container fluid>
                  <div class="pa-4">
                    <v-row>
                      <v-col cols="12" md="12">
                        <v-text-field
                          v-model="editedItem.firstname"
                          :rules="firstNameRules"
                          :counter="50"
                          label="First name"
                          required
                          outlined
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="12">
                        <v-text-field
                          v-model="editedItem.lastname"
                          :rules="lastNameRules"
                          :counter="50"
                          label="Last name"
                          required
                          outlined
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="12">
                        <v-text-field
                          v-model="editedItem.age"
                          type="number"
                          :rules="ageRules"
                          label="Age"
                          required
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel</v-btn>
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="edit"
              >
                Update
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <h3>No Data Available</h3>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import Student from "../../classes/student";

export default {
  name: "List",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "First name",
        value: "firstname",
      },
      { text: "Last name", value: "lastname" },
      { text: "Age", value: "age" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      firstname: "",
      lastname: "",
      age: 0,
    },
    defaultItem: {
      firstname: "",
      lastname: "",
      age: "",
    },
    valid: false,
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

  computed: {
    students() {
      return Student.all();
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  mounted() {
  },
  methods: {
    editItem(item) {
      this.editedIndex = item.$id;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = item.$id;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      Student.delete(this.editedIndex);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async edit() {
      await Student.update({
        where: this.editedIndex,
        data: {
          firstname: this.editedItem.firstname,
          lastname: this.editedItem.lastname,
          age: this.editedItem.age,
        },
      });
      this.close();
    },
  },
};
</script>
