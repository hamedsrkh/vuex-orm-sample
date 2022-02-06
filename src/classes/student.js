import { Model } from "@vuex-orm/core";

export default class Student extends Model {
  static entity = "students";

  static $fields() {
    return {
      firstname: this.attr(""),
      lastname: this.attr(""),
      age: this.attr(0),
    };
  }
}
