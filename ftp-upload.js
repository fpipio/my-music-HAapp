import * as ftp from "basic-ftp";
const client = new ftp.Client();
client.ftp.verbose = true;

client.access({
    host: "192.168.88.61",
    user: "hassio",
    password: "tesO01Sono!",
}).then(() => {
    return client.uploadFromDir("dist", "/config/www"); // Qui "/remote/path" rappresenta la destinazione FTP
}).then(() => {
    console.log("Upload completo");
}).catch(err => {
    console.error(err);
}).finally(() => {
    client.close();
});