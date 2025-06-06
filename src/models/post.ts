import { getModelForClass, modelOptions, Prop, Ref } from "@typegoose/typegoose";
import { User } from "./user";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Post {
    @Prop({ required: true })
    PostName!: string;

    @Prop({ required: true })
    PostTag!: string[];

    @Prop({ ref: () => User })
    author!: Ref<User>

}

export const PostModel= getModelForClass(Post)