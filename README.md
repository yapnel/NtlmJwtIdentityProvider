# NtlmJwtIdentityProvider
NTLM Authentication, LDAP lookup and JWT Identity Provider

.env file
ldapUsername=XXX
ldapPassword=XXX
passphrasePassword=XXX

CA.cer
public_key.pem
private_key.pem

url: 'ldaps://XXX:636',
bindDN: '',
searchBase: '',
searchFilter: ''

origin: [/:\/\/(.+\.)?domain.net/,/:\/\/(.+\.)?domain.com/],