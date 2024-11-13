import express from "express";
import type { Request, Response } from "express";
import { WebhookClient } from "discord.js";

const app = express();
const port = 8080;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req: Request, res: Response) => {
  res.render("home");
});

app.post("/webhook", async function (req: Request, res: Response) {
    const {url, content, name} = req.body;
    if (!url) {
        res.status(500).send("Enter Webhook Url");
        return;
    }
    const webhookClient = new WebhookClient({ url: url });
    try {
        await webhookClient.send({
        content: content,
        username: name ? name : "Webhook By MrChimKy",
        avatarURL:
            "https://media.discordapp.net/attachments/869435129049776169/1261387925170556949/31_20240713011522.png?ex=673597cc&is=6734464c&hm=3777d3b0daa4c692333cbef3fcbcb53ba22690d77b09c14b021fa8ffcb3ec14f&=&format=webp&quality=lossless&width=546&height=546",
        });
        res.status(200).send("Message sent successfully!");
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to send message.");
    }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
