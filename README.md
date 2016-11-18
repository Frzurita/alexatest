# alexatest

# Build instructions:
git clone https://github.com/Frzurita/alexatest/
npm install

Si no estan los certificados ya instalados:
chmod u+x certbot-auto
./certbot-auto certonly --standalone -d becsmarthome.dnsdynamic.com

npm start

Si estas haciendo una prueba en localhost, puedes pasarte los certificados
mediante scp y cambiar el sslPath de server.js.
En este caso habra que correr npm start como root.
