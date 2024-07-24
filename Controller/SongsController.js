import prisma from "../DB/db.config.js";

// Add New Song
export const addSong = async (req, res) => {
    const { user_id, song_name, singer, song_type } = req.body;


    await prisma.user.update({
        where: {
            id: Number(user_id)
        },
        data: {
            songs_added: {
                increment: 1
            }
        }
    })

    const newSong = await prisma.songs.create({
        data: {
            user_id: Number(user_id),
            song_name,
            singer,
            song_type
        }
    });
    return res.json({ status: 200, data: newSong, Message: "Song added successfully." })
};


// Fetch all Songs
export const fetchAllSongs = async (req, res) => {
    const comments = await prisma.songs.findMany({
        include: {
            user: true,
        }
    });

    return res.json({ status: 200, data: comments, "Here we get": "All Songs." })
};



//Fetch Song by Name
export const fetchBySong = async (req, res) => {
    const songName = req.body.songName;

    const userSongs = await prisma.songs.findMany({
        where: {
            song_name: {
                contains: songName
            }
        },
        include: {
            user: true
        }

    })
    return res.json({ status: 200, data: userSongs, message: "Here is your song." })
};


// Update the Song
export const updateSong = async (req, res) => {
    const song_id = req.params.id;
    const { user_id, song_name, singer, song_type } = req.body;

    await prisma.songs.update({
        where: {
            id: Number(song_id)
        },
        data: {
            user_id: Number(user_id),
            song_name,
            singer,
            song_type
        }
    });

    return res.json({ status: 200, message: "Song updated successfully." })
};



// Delete Song by ID
export const deleteSong = async (req, res) => {
    const song_id = req.params.id;
    const user_id = req.body.user_id


    await prisma.user.update({
        where: {
            id: Number(user_id)
        },
        data: {
            songs_added: {
                decrement: 1
            },
        },
    });

    await prisma.songs.delete({
        where: {
            id: Number(song_id)
        }
    });
    return res.json({ status: 200, message: "Song deleted successfully." })
};