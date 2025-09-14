    import mongoose from "mongoose";
    import bcrypt from "bcryptjs";

    const userSchema = new mongoose.Schema({
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        bio: {
            type: String,
            default: "",
        },
        profilePicture: {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        },
        nativeLanguage: {
            type: String,
            default: "",
        },
        learningLanguage: {
            type: String,
            default: "",
        },
        location: {
            type: String,
            default: "",
        },
        isOnboarded: {
            type: Boolean,
            default: false,
        },

        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
    },{timestamps: true});

    // Pre Hook , we will hash the password before saving it to the database
    userSchema.pre("save",async function(next) {
        if(!this.isModified("password")) return next();
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt); 

            next();
        } catch (error) {
            next(error);
        }
    });

    // This method will be used to compare the password entered by the user with the password stored in the database
    userSchema.methods.matchPassword = async function(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    } 

    const User = mongoose.model("User", userSchema); 
    export default User;