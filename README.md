# alexatest

# Build instructions:
git clone https://github.com/Frzurita/alexatest/

npm install

Si no estan los certificados ya instalados:
chmod u+x certbot-auto
./certbot-auto certonly --standalone -d becsmarthome.dnsdynamic.com

Y finalmente levantamos el servidor. Como estamos accediendo a puertos protegidos (443), ademas de que los certificados estan en /etc/, debemos de ejecutarlo como root.
sudo npm start

Si estas haciendo una prueba en localhost, puedes pasarte los certificados
mediante scp y cambiar el sslPath de server.js.
