    // Create an NA client object
	console.log("here!!");
    var client = HuaweiSmarthome.Client("IFTTT",{
                INFO_LOG_ON: true,
                SHOW_HEARTBEAT: false,
                NA_SERVER_HOST: '62.14.234.69',
                NA_SERVER_PORT: '8443'
            }
    );

    // Create an empty collection of devices
    var deviceCollection = {};

    // Create an lightBulb
    var lightBulb = client.Device('The light bulb');

    // User account for testing
    /*
	   var userCredentials = {
        key: "0034912345600",
        secret: "Aa123456"
    };
	*/
    var userCredentials = {
        key: "0034600000000",
        secret: "CCpruebas_1"
    };

    // Sign in with user credentials
    client.signInWithCredentials(userCredentials);

