import app from "./app.js";
import { env } from "./config/env.js";
app.listen(env.PORT, () => {
    console.log(`🚀 Server rodando na porta ${env.PORT} em modo ${env.NODE_ENV}`);
});
//# sourceMappingURL=server.js.map