import { AuthService } from '../services/auth.service.js';
import { transporter, email } from "../messages/email.js";
import { logger } from '../loggers/logger.js';


    const users = AuthService;
class AuthController{

    static signup = async (req, res) => {
        if (req.session.passport) {
            res.redirect("profile");
        }
        res.render("signup");
    };

    static signupError = (req, res) => {
        const errorMessage = req.session.messages[0] || "";
        req.session.messages = [];
        res.json({ error: errorMessage })
    };

    static signin = (req, res) => {
        if (req.session.passport) res.redirect("profile")
        res.render("signin")
    };

    static logout = (req, res) => {
        req.logout((err) => {
            if (err) {
                return res.status(500).json({ error: 'No se pudo cerrar la sesión' });
            }
            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).json({ error: 'No se pudo cerrar la sesión' });
                }
                res.clearCookie('connect.sid');
                res.redirect('/api/auth/signin');
            });
        });
    };

    static test = (req, res) => {
        res.render("signup")
    };

    static profile = async (req, res) => {
        const info = await users.getById(req.session.passport.user);
        res.render("profile", { info: info.toJSON() })
    };
}



export { AuthController };