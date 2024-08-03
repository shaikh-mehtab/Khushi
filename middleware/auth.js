const connection = require("../connection");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username) {
            return res.status(400).send({
                tatus: false,
                msg: "filled the usename"
            })
        }
        if (!password) {
            return res.status(400).send({
                status: false,
                msg: "filled the password"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;

        const data = await connection.query(sql, [username, hashedPassword]);
        const token = jwt.sign({ username: username }, 'jwttoken', { expiresIn: '90d' });
        res.cookie("jwttoken", token)


        if (data) {
            return res.status(200).json({
                status: true,
                message: 'User created successfully',
                token: token
            });
        } else {
            res.status(500).json({
                status: false,
                message: "Failed to create user"
            });
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        });
    }
};

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers["x-api-key"]

        if (!token) {
            return res.status(400).send({
                tatus: false,
                msg: "token not found"
            })
        }
        jwt.verify(token, 'jwttoken', (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    status: false,
                    message: 'Failed to authenticate token'
                });
            };
            req.userId = decoded.userId;
            next();
        });
    } catch (error) {

        res.status(500).json({
            status: false,
            message: error.message
        })
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie('jwttoken');
        res.status(200).json({
            message: "logout successfull"
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        })
    }
}
module.exports = { login, verifyToken, logout };
