import prisma from "../DB/db.config.js";
import bcrypt from "bcrypt";




export const createUser = async (req, res) => {
    const { name, email } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const findUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (findUser) {
        return res.json({ status: 400, message: "Email already exist. Please use another one." })
    }

    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword
        }
    });
    return res.json({ status: 200, data: newUser, msg: "User created." })
};


// Fetch all Users
export const fetchUsers = async (req, res) => {
    const users = await prisma.user.findMany({

    });

    return res.json({ status: 200, data: users, "Here we get": "All Users." })
};


// Fetch User by ID
export const fetchUserById = async (req, res) => {
    const userId = req.params.id;
    const user = await prisma.user.findFirst({
        where: {
            id: Number(userId)
        },
    });
    return res.json({ status: 200, data: user, "Here we get": "The User." })

};


// Update the User by ID
export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    const newHashedPassword = await bcrypt.hash(req.body.password, 10);

    await prisma.user.update({
        where: {
            id: Number(userId)
        },
        data: {
            name,
            email,
            password : newHashedPassword
        }
    });

    return res.json({ status: 200, message: "User updated successfully." })
};


//Delete User by ID
export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    await prisma.user.deleteMany({
        where: {
            id: Number(userId)
        }
    });
    return res.json({ status: 200, message: "User deleted successfully." })
};