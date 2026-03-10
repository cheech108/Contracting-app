import Auth from './auth.js';
import Verify from '../middleware/verify.js';
const Router = (server) => {
server.use('/v1/auth', Auth);
server.get("/v1", (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            data: [],
            message: "API connection sucsesful",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
})
server.get("/v1/user", Verify, (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to the your Dashboard!",
    });
});
};
export default Router;