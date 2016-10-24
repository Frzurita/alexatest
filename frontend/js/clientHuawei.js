module.export = { 
	sign_in: sign_in();
};
void signIn(){
  	console.log("Connecting to platform...");
    var client = HuaweiSmarthome.Client("IFTTT",{
                INFO_LOG_ON: true,
                SHOW_HEARTBEAT: false,
                NA_SERVER_HOST: '62.14.234.69',
                NA_SERVER_PORT: '8443'
            }
    );
  	console.log("signing in...");
    var userCredentials = {
        key: "0034600000000",
        secret: "CCpruebas_1"
    };
    client.signInWithCredentials(userCredentials);
  	console.log("Signed in...");
}
/*
    // Create an empty collection of devices
    var deviceCollection = {};

    // Create an lightBulb
    var lightBulb = client.Device('The light bulb');
*/
