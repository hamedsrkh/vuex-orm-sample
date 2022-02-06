import Vue from "vue";
import Vuex from "vuex";
import VuexORM from "@vuex-orm/core";
import Student from "../classes/student";

Vue.use(Vuex);
const database = new VuexORM.Database();

database.register(Student);

const store = new Vuex.Store({
  plugins: [VuexORM.install(database)],
});

export default store;
