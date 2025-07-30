This project provides an NTLM Authentication, LDAP lookup, and JWT Identity Provider. It allows for authenticating users via NTLM, looking up user information in an LDAP directory, and issuing JSON Web Tokens (JWTs) for identity management.

How to Use
To set up and run this project, you'll need to configure environment variables and provide necessary certificate files.
Configuration
 * Environment Variables:
   Create a .env file in the project's root directory with the following variables:
   * ldapUsername: Username for binding to the LDAP server.
   * ldapPassword: Password for binding to the LDAP server.
   * passphrasePassword: A passphrase used for internal security (e.g., for encrypting/decrypting keys).
   * url: The LDAPS (LDAP over SSL) URL of your LDAP server (e.g., ldaps://your-ldap-server:636).
   * bindDN: The distinguished name (DN) used to bind to the LDAP server (e.g., CN=ServiceAccount,OU=Users,DC=yourdomain,DC=com).
   * searchBase: The base DN for searching users in the LDAP directory (e.g., OU=Users,DC=yourdomain,DC=com).
   * searchFilter: The LDAP filter used to find users (e.g., (sAMAccountName={{username}}), where {{username}} is a placeholder for the actual username).
   * origin: A regular expression defining allowed origins for CORS (Cross-Origin Resource Sharing). For example: [/://(.+.)?domain.net/,/://(.+.)?domain.com/]
 * Certificate and Key Files:
   Place the following files in the appropriate directory (e.g., a certs folder, as per project structure):
   * CA.cer: The Certificate Authority (CA) certificate used to sign your LDAP server's certificate.
   * public_key.pem: Your public key for JWT signing verification.
   * private_key.pem: Your private key for JWT signing.

Example .env File Structure:
ldapUsername=your_ldap_bind_username
ldapPassword=your_ldap_bind_password
passphrasePassword=your_secret_passphrase
url=ldaps://your-ldap-server-hostname:636
bindDN=CN=ServiceAccount,OU=Users,DC=yourdomain,DC=com
searchBase=OU=Users,DC=yourdomain,DC=com
searchFilter=(sAMAccountName={{username}})
origin=[/://(.+.)?yourdomain.net/,/://(.+.)?yourdomain.com/]


To deploy and start the server for the "NtlmJwtIdentityProvider" project, you will typically follow these steps, common for most Node.js applications. Please note that without direct access to the project's internal files (like package.json for specific start scripts), these are general guidelines.

 * Clone the Repository:
   First, you need to clone the project from GitHub to your local machine or server:
   git clone https://github.com/yapnel/NtlmJwtIdentityProvider.git
cd NtlmJwtIdentityProvider

 * Install Dependencies:
   Navigate into the cloned directory and install the necessary Node.js packages. This project likely uses npm (Node Package Manager) or yarn.
   npm install
# OR if using yarn
# yarn install

 * Configure Environment Variables and Certificates:
   As mentioned in the previous response, you must set up your .env file with the required environment variables (ldapUsername, ldapPassword, passphrasePassword, url, bindDN, searchBase, searchFilter, origin) and place the CA.cer, public_key.pem, and private_key.pem files in the appropriate location as expected by the application.
 * Start the Server:
   Once dependencies are installed and configuration is set up, you can start the server. The most common commands for Node.js applications are:
   * Using npm start (if defined in package.json):
     Many Node.js projects define a start script in their package.json file. If this project has one, simply run:
     npm start

   * Directly running the main file:
     If npm start doesn't work or isn't defined, you might need to run the main server file directly (e.g., index.js or app.js). You would typically find this specified in the main field of package.json or by examining the project's root directory.
     node index.js
# OR
# node app.js

   * Using a process manager (for production):
     For production environments, it's recommended to use a process manager like PM2, forever, or systemd to keep your application running continuously and manage restarts.
     * PM2 example:
       npm install -g pm2 # Install PM2 globally if you haven't already
pm2 start index.js --name "ntlm-jwt-idp"
pm2 save
pm2 startup

