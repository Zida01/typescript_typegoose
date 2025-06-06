import { getModelForClass, modelOptions, pre, Prop } from "@typegoose/typegoose"
import { SchemaTypeOptions } from "mongoose";
import validator from "validator";
    
@modelOptions({ schemaOptions: { _id: true } })
class Job {
  @Prop({ required: true })
  JobName!: string;

  @Prop()
  JobDescription!: string;
}
@pre<User>("save", function () {
  if (this.Jobs && Array.isArray(this.Jobs)) {
    this.Jobs.forEach((job) => {
      if (job.JobName) {
        job.JobName = job.JobName.trim().toUpperCase();
      }
    });
  }
})
    
@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @Prop({ required: true, unique: true })
  Username!: String;

  @Prop()
    Jobs?: Job[];

    @Prop({
        validate: (v: string) => {
          return  validator.isEmail(v);
        },
        message: "Invalid email format",
    })
    Email!: string
    

}

    
export const UserModel=  getModelForClass(User)