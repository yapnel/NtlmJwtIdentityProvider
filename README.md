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

