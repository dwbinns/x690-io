// From openssl:crypto/objects/objects.txt
let openSSLOIDs = `
# CCITT was renamed to ITU-T quite some time ago
0			: ITU-T			: itu-t
!Alias ccitt itu-t

1			: ISO			: iso

2			: JOINT-ISO-ITU-T	: joint-iso-itu-t
!Alias joint-iso-ccitt joint-iso-itu-t

iso 2			: member-body		: ISO Member Body

iso 3			: identified-organization

# GMAC OID
iso 0 9797 3 4                          : GMAC          : gmac

# HMAC OIDs
identified-organization 6 1 5 5 8 1 1	: HMAC-MD5	: hmac-md5
identified-organization 6 1 5 5 8 1 2	: HMAC-SHA1	: hmac-sha1

# "1.3.36.8.3.3"
identified-organization 36 8 3 3	: x509ExtAdmission	: Professional Information or basis for Admission

identified-organization 132	: certicom-arc

identified-organization 111     : ieee
ieee 2 1619                     : ieee-siswg    : IEEE Security in Storage Working Group

joint-iso-itu-t 23	: international-organizations	: International Organizations

international-organizations 43	: wap
wap 1			: wap-wsg

joint-iso-itu-t 5 1 5	: selected-attribute-types	: Selected Attribute Types

selected-attribute-types 55	: clearance

member-body 840		: ISO-US		: ISO US Member Body
ISO-US 10040		: X9-57			: X9.57
X9-57 4			: X9cm			: X9.57 CM ?

member-body 156         : ISO-CN        : ISO CN Member Body
ISO-CN 10197            : oscca
oscca 1                 : sm-scheme

!Cname dsa
X9cm 1			: DSA			: dsaEncryption
X9cm 3			: DSA-SHA1		: dsaWithSHA1


ISO-US 10045		: ansi-X9-62		: ANSI X9.62
!module X9-62
!Alias id-fieldType ansi-X9-62 1
X9-62_id-fieldType 1		: prime-field
X9-62_id-fieldType 2		: characteristic-two-field
X9-62_characteristic-two-field 3 : id-characteristic-two-basis
X9-62_id-characteristic-two-basis 1 : onBasis
X9-62_id-characteristic-two-basis 2 : tpBasis
X9-62_id-characteristic-two-basis 3 : ppBasis
!Alias id-publicKeyType ansi-X9-62 2
X9-62_id-publicKeyType 1	: id-ecPublicKey
!Alias ellipticCurve ansi-X9-62 3
!Alias c-TwoCurve X9-62_ellipticCurve 0
X9-62_c-TwoCurve 1		: c2pnb163v1
X9-62_c-TwoCurve 2		: c2pnb163v2
X9-62_c-TwoCurve 3		: c2pnb163v3
X9-62_c-TwoCurve 4		: c2pnb176v1
X9-62_c-TwoCurve 5		: c2tnb191v1
X9-62_c-TwoCurve 6		: c2tnb191v2
X9-62_c-TwoCurve 7		: c2tnb191v3
X9-62_c-TwoCurve 8		: c2onb191v4
X9-62_c-TwoCurve 9		: c2onb191v5
X9-62_c-TwoCurve 10		: c2pnb208w1
X9-62_c-TwoCurve 11		: c2tnb239v1
X9-62_c-TwoCurve 12		: c2tnb239v2
X9-62_c-TwoCurve 13		: c2tnb239v3
X9-62_c-TwoCurve 14		: c2onb239v4
X9-62_c-TwoCurve 15		: c2onb239v5
X9-62_c-TwoCurve 16		: c2pnb272w1
X9-62_c-TwoCurve 17		: c2pnb304w1
X9-62_c-TwoCurve 18		: c2tnb359v1
X9-62_c-TwoCurve 19		: c2pnb368w1
X9-62_c-TwoCurve 20		: c2tnb431r1
!Alias primeCurve X9-62_ellipticCurve 1
X9-62_primeCurve 1	 	: prime192v1
X9-62_primeCurve 2	 	: prime192v2
X9-62_primeCurve 3	 	: prime192v3
X9-62_primeCurve 4	 	: prime239v1
X9-62_primeCurve 5	 	: prime239v2
X9-62_primeCurve 6	 	: prime239v3
X9-62_primeCurve 7	 	: prime256v1
!Alias id-ecSigType ansi-X9-62 4
!global
X9-62_id-ecSigType 1		: ecdsa-with-SHA1
X9-62_id-ecSigType 2		: ecdsa-with-Recommended
X9-62_id-ecSigType 3		: ecdsa-with-Specified
ecdsa-with-Specified 1		: ecdsa-with-SHA224
ecdsa-with-Specified 2		: ecdsa-with-SHA256
ecdsa-with-Specified 3		: ecdsa-with-SHA384
ecdsa-with-Specified 4		: ecdsa-with-SHA512

# SECG curve OIDs from "SEC 2: Recommended Elliptic Curve Domain Parameters"
# (http://www.secg.org/)
!Alias secg_ellipticCurve certicom-arc 0
# SECG prime curves OIDs
secg-ellipticCurve 6		: secp112r1
secg-ellipticCurve 7		: secp112r2
secg-ellipticCurve 28		: secp128r1
secg-ellipticCurve 29		: secp128r2
secg-ellipticCurve 9		: secp160k1
secg-ellipticCurve 8		: secp160r1
secg-ellipticCurve 30		: secp160r2
secg-ellipticCurve 31		: secp192k1
# NOTE: the curve secp192r1 is the same as prime192v1 defined above
#       and is therefore omitted
secg-ellipticCurve 32		: secp224k1
secg-ellipticCurve 33		: secp224r1
secg-ellipticCurve 10		: secp256k1
# NOTE: the curve secp256r1 is the same as prime256v1 defined above
#       and is therefore omitted
secg-ellipticCurve 34		: secp384r1
secg-ellipticCurve 35		: secp521r1
# SECG characteristic two curves OIDs
secg-ellipticCurve 4		: sect113r1
secg-ellipticCurve 5		: sect113r2
secg-ellipticCurve 22		: sect131r1
secg-ellipticCurve 23		: sect131r2
secg-ellipticCurve 1		: sect163k1
secg-ellipticCurve 2		: sect163r1
secg-ellipticCurve 15		: sect163r2
secg-ellipticCurve 24		: sect193r1
secg-ellipticCurve 25		: sect193r2
secg-ellipticCurve 26		: sect233k1
secg-ellipticCurve 27		: sect233r1
secg-ellipticCurve 3		: sect239k1
secg-ellipticCurve 16		: sect283k1
secg-ellipticCurve 17		: sect283r1
secg-ellipticCurve 36		: sect409k1
secg-ellipticCurve 37		: sect409r1
secg-ellipticCurve 38		: sect571k1
secg-ellipticCurve 39		: sect571r1

# WAP/TLS curve OIDs (http://www.wapforum.org/)
!Alias wap-wsg-idm-ecid wap-wsg 4
wap-wsg-idm-ecid 1	: wap-wsg-idm-ecid-wtls1
wap-wsg-idm-ecid 3	: wap-wsg-idm-ecid-wtls3
wap-wsg-idm-ecid 4	: wap-wsg-idm-ecid-wtls4
wap-wsg-idm-ecid 5	: wap-wsg-idm-ecid-wtls5
wap-wsg-idm-ecid 6	: wap-wsg-idm-ecid-wtls6
wap-wsg-idm-ecid 7	: wap-wsg-idm-ecid-wtls7
wap-wsg-idm-ecid 8	: wap-wsg-idm-ecid-wtls8
wap-wsg-idm-ecid 9	: wap-wsg-idm-ecid-wtls9
wap-wsg-idm-ecid 10	: wap-wsg-idm-ecid-wtls10
wap-wsg-idm-ecid 11	: wap-wsg-idm-ecid-wtls11
wap-wsg-idm-ecid 12	: wap-wsg-idm-ecid-wtls12


ISO-US 113533 7 66 10	: CAST5-CBC		: cast5-cbc
			: CAST5-ECB		: cast5-ecb
!Cname cast5-cfb64
			: CAST5-CFB		: cast5-cfb
!Cname cast5-ofb64
			: CAST5-OFB		: cast5-ofb
!Cname pbeWithMD5AndCast5-CBC
ISO-US 113533 7 66 12	:			: pbeWithMD5AndCast5CBC

# Macs for CMP and CRMF
ISO-US 113533 7 66 13	: id-PasswordBasedMAC	: password based MAC
ISO-US 113533 7 66 30	: id-DHBasedMac		: Diffie-Hellman based MAC

ISO-US 113549		: rsadsi		: RSA Data Security, Inc.

rsadsi 1		: pkcs			: RSA Data Security, Inc. PKCS

pkcs 1			: pkcs1
pkcs1 1			:			: rsaEncryption
pkcs1 2			: RSA-MD2		: md2WithRSAEncryption
pkcs1 3			: RSA-MD4		: md4WithRSAEncryption
pkcs1 4			: RSA-MD5		: md5WithRSAEncryption
pkcs1 5			: RSA-SHA1		: sha1WithRSAEncryption
# According to PKCS #1 version 2.1
pkcs1 7			: RSAES-OAEP		: rsaesOaep
pkcs1 8			: MGF1			: mgf1
pkcs1 9			: PSPECIFIED		: pSpecified
pkcs1 10		: RSASSA-PSS		: rsassaPss

pkcs1 11		: RSA-SHA256		: sha256WithRSAEncryption
pkcs1 12		: RSA-SHA384		: sha384WithRSAEncryption
pkcs1 13		: RSA-SHA512		: sha512WithRSAEncryption
pkcs1 14		: RSA-SHA224		: sha224WithRSAEncryption
pkcs1 15		: RSA-SHA512/224	: sha512-224WithRSAEncryption
pkcs1 16		: RSA-SHA512/256	: sha512-256WithRSAEncryption

pkcs 3			: pkcs3
pkcs3 1			:			: dhKeyAgreement

pkcs 5			: pkcs5
pkcs5 1			: PBE-MD2-DES		: pbeWithMD2AndDES-CBC
pkcs5 3			: PBE-MD5-DES		: pbeWithMD5AndDES-CBC
pkcs5 4			: PBE-MD2-RC2-64	: pbeWithMD2AndRC2-CBC
pkcs5 6			: PBE-MD5-RC2-64	: pbeWithMD5AndRC2-CBC
pkcs5 10		: PBE-SHA1-DES		: pbeWithSHA1AndDES-CBC
pkcs5 11		: PBE-SHA1-RC2-64	: pbeWithSHA1AndRC2-CBC
!Cname id_pbkdf2
pkcs5 12		:			: PBKDF2
!Cname pbes2
pkcs5 13		:			: PBES2
!Cname pbmac1
pkcs5 14		:			: PBMAC1

pkcs 7			: pkcs7
pkcs7 1			:			: pkcs7-data
!Cname pkcs7-signed
pkcs7 2			:			: pkcs7-signedData
!Cname pkcs7-enveloped
pkcs7 3			:			: pkcs7-envelopedData
!Cname pkcs7-signedAndEnveloped
pkcs7 4			:			: pkcs7-signedAndEnvelopedData
!Cname pkcs7-digest
pkcs7 5			:			: pkcs7-digestData
!Cname pkcs7-encrypted
pkcs7 6			:			: pkcs7-encryptedData

pkcs 9			: pkcs9
!module pkcs9
pkcs9 1			: 			: emailAddress
pkcs9 2			:			: unstructuredName
pkcs9 3			:			: contentType
pkcs9 4			:			: messageDigest
pkcs9 5			:			: signingTime
pkcs9 6			:			: countersignature
pkcs9 7			:			: challengePassword
pkcs9 8			:			: unstructuredAddress
!Cname extCertAttributes
pkcs9 9			:			: extendedCertificateAttributes
!global

!Cname ext-req
pkcs9 14		: extReq		: Extension Request

!Cname SMIMECapabilities
pkcs9 15		: SMIME-CAPS		: S/MIME Capabilities

# S/MIME
!Cname SMIME
pkcs9 16		: SMIME			: S/MIME
SMIME 0			: id-smime-mod
SMIME 1			: id-smime-ct
SMIME 2			: id-smime-aa
SMIME 3			: id-smime-alg
SMIME 4			: id-smime-cd
SMIME 5			: id-smime-spq
SMIME 6			: id-smime-cti

# S/MIME Modules
id-smime-mod 1		: id-smime-mod-cms
id-smime-mod 2		: id-smime-mod-ess
id-smime-mod 3		: id-smime-mod-oid
id-smime-mod 4		: id-smime-mod-msg-v3
id-smime-mod 5		: id-smime-mod-ets-eSignature-88
id-smime-mod 6		: id-smime-mod-ets-eSignature-97
id-smime-mod 7		: id-smime-mod-ets-eSigPolicy-88
id-smime-mod 8		: id-smime-mod-ets-eSigPolicy-97

# S/MIME Content Types
id-smime-ct 1		: id-smime-ct-receipt
id-smime-ct 2		: id-smime-ct-authData
id-smime-ct 3		: id-smime-ct-publishCert
id-smime-ct 4		: id-smime-ct-TSTInfo
id-smime-ct 5		: id-smime-ct-TDTInfo
id-smime-ct 6		: id-smime-ct-contentInfo
id-smime-ct 7		: id-smime-ct-DVCSRequestData
id-smime-ct 8		: id-smime-ct-DVCSResponseData
id-smime-ct 9		: id-smime-ct-compressedData
id-smime-ct 19		: id-smime-ct-contentCollection
id-smime-ct 23		: id-smime-ct-authEnvelopedData
id-smime-ct 27		: id-ct-asciiTextWithCRLF
id-smime-ct 28		: id-ct-xml

# S/MIME Attributes
id-smime-aa 1		: id-smime-aa-receiptRequest
id-smime-aa 2		: id-smime-aa-securityLabel
id-smime-aa 3		: id-smime-aa-mlExpandHistory
id-smime-aa 4		: id-smime-aa-contentHint
id-smime-aa 5		: id-smime-aa-msgSigDigest
# obsolete
id-smime-aa 6		: id-smime-aa-encapContentType
id-smime-aa 7		: id-smime-aa-contentIdentifier
# obsolete
id-smime-aa 8		: id-smime-aa-macValue
id-smime-aa 9		: id-smime-aa-equivalentLabels
id-smime-aa 10		: id-smime-aa-contentReference
id-smime-aa 11		: id-smime-aa-encrypKeyPref
id-smime-aa 12		: id-smime-aa-signingCertificate
id-smime-aa 13		: id-smime-aa-smimeEncryptCerts
id-smime-aa 14		: id-smime-aa-timeStampToken
id-smime-aa 15		: id-smime-aa-ets-sigPolicyId
id-smime-aa 16		: id-smime-aa-ets-commitmentType
id-smime-aa 17		: id-smime-aa-ets-signerLocation
id-smime-aa 18		: id-smime-aa-ets-signerAttr
id-smime-aa 19		: id-smime-aa-ets-otherSigCert
id-smime-aa 20		: id-smime-aa-ets-contentTimestamp
id-smime-aa 21		: id-smime-aa-ets-CertificateRefs
id-smime-aa 22		: id-smime-aa-ets-RevocationRefs
id-smime-aa 23		: id-smime-aa-ets-certValues
id-smime-aa 24		: id-smime-aa-ets-revocationValues
id-smime-aa 25		: id-smime-aa-ets-escTimeStamp
id-smime-aa 26		: id-smime-aa-ets-certCRLTimestamp
id-smime-aa 27		: id-smime-aa-ets-archiveTimeStamp
id-smime-aa 28		: id-smime-aa-signatureType
id-smime-aa 29		: id-smime-aa-dvcs-dvc
id-smime-aa 47		: id-smime-aa-signingCertificateV2

# S/MIME Algorithm Identifiers
# obsolete
id-smime-alg 1		: id-smime-alg-ESDHwith3DES
# obsolete
id-smime-alg 2		: id-smime-alg-ESDHwithRC2
# obsolete
id-smime-alg 3		: id-smime-alg-3DESwrap
# obsolete
id-smime-alg 4		: id-smime-alg-RC2wrap
id-smime-alg 5		: id-smime-alg-ESDH
id-smime-alg 6		: id-smime-alg-CMS3DESwrap
id-smime-alg 7		: id-smime-alg-CMSRC2wrap
id-smime-alg 9		: id-alg-PWRI-KEK

# S/MIME Certificate Distribution
id-smime-cd 1		: id-smime-cd-ldap

# S/MIME Signature Policy Qualifier
id-smime-spq 1		: id-smime-spq-ets-sqt-uri
id-smime-spq 2		: id-smime-spq-ets-sqt-unotice

# S/MIME Commitment Type Identifier
id-smime-cti 1		: id-smime-cti-ets-proofOfOrigin
id-smime-cti 2		: id-smime-cti-ets-proofOfReceipt
id-smime-cti 3		: id-smime-cti-ets-proofOfDelivery
id-smime-cti 4		: id-smime-cti-ets-proofOfSender
id-smime-cti 5		: id-smime-cti-ets-proofOfApproval
id-smime-cti 6		: id-smime-cti-ets-proofOfCreation

pkcs9 20		:			: friendlyName
pkcs9 21		:			: localKeyID
!Cname ms-csp-name
1 3 6 1 4 1 311 17 1	: CSPName		: Microsoft CSP Name
1 3 6 1 4 1 311 17 2	: LocalKeySet		: Microsoft Local Key set
!Alias certTypes pkcs9 22
certTypes 1		:			: x509Certificate
certTypes 2		:			: sdsiCertificate
!Alias crlTypes pkcs9 23
crlTypes 1		:			: x509Crl

!Alias pkcs12 pkcs 12
!Alias pkcs12-pbeids pkcs12 1

!Cname pbe-WithSHA1And128BitRC4
pkcs12-pbeids 1		: PBE-SHA1-RC4-128	: pbeWithSHA1And128BitRC4
!Cname pbe-WithSHA1And40BitRC4
pkcs12-pbeids 2		: PBE-SHA1-RC4-40	: pbeWithSHA1And40BitRC4
!Cname pbe-WithSHA1And3_Key_TripleDES-CBC
pkcs12-pbeids 3		: PBE-SHA1-3DES		: pbeWithSHA1And3-KeyTripleDES-CBC
!Cname pbe-WithSHA1And2_Key_TripleDES-CBC
pkcs12-pbeids 4		: PBE-SHA1-2DES		: pbeWithSHA1And2-KeyTripleDES-CBC
!Cname pbe-WithSHA1And128BitRC2-CBC
pkcs12-pbeids 5		: PBE-SHA1-RC2-128	: pbeWithSHA1And128BitRC2-CBC
!Cname pbe-WithSHA1And40BitRC2-CBC
pkcs12-pbeids 6		: PBE-SHA1-RC2-40	: pbeWithSHA1And40BitRC2-CBC

!Alias pkcs12-Version1 pkcs12 10
!Alias pkcs12-BagIds pkcs12-Version1 1
pkcs12-BagIds 1		:			: keyBag
pkcs12-BagIds 2		:			: pkcs8ShroudedKeyBag
pkcs12-BagIds 3		:			: certBag
pkcs12-BagIds 4		:			: crlBag
pkcs12-BagIds 5		:			: secretBag
pkcs12-BagIds 6		:			: safeContentsBag

rsadsi 2 2		: MD2			: md2
rsadsi 2 4		: MD4			: md4
rsadsi 2 5		: MD5			: md5
			: MD5-SHA1		: md5-sha1
rsadsi 2 6		:			: hmacWithMD5
rsadsi 2 7		:			: hmacWithSHA1

sm-scheme 301           : SM2                   : sm2

sm-scheme 401           : SM3                   : sm3
sm-scheme 504           : RSA-SM3		: sm3WithRSAEncryption

sm-scheme 501           : SM2-SM3               : SM2-with-SM3

# From RFC4231
rsadsi 2 8		:			: hmacWithSHA224
rsadsi 2 9		:			: hmacWithSHA256
rsadsi 2 10		:			: hmacWithSHA384
rsadsi 2 11		:			: hmacWithSHA512

# From RFC8018
rsadsi 2 12             :                       : hmacWithSHA512-224
rsadsi 2 13             :                       : hmacWithSHA512-256

rsadsi 3 2		: RC2-CBC		: rc2-cbc
			: RC2-ECB		: rc2-ecb
!Cname rc2-cfb64
			: RC2-CFB		: rc2-cfb
!Cname rc2-ofb64
			: RC2-OFB		: rc2-ofb
			: RC2-40-CBC		: rc2-40-cbc
			: RC2-64-CBC		: rc2-64-cbc
rsadsi 3 4		: RC4			: rc4
			: RC4-40		: rc4-40
rsadsi 3 7		: DES-EDE3-CBC		: des-ede3-cbc
rsadsi 3 8		: RC5-CBC		: rc5-cbc
			: RC5-ECB		: rc5-ecb
!Cname rc5-cfb64
			: RC5-CFB		: rc5-cfb
!Cname rc5-ofb64
			: RC5-OFB		: rc5-ofb

!Cname ms-ext-req
1 3 6 1 4 1 311 2 1 14	: msExtReq		: Microsoft Extension Request
!Cname ms-code-ind
1 3 6 1 4 1 311 2 1 21	: msCodeInd		: Microsoft Individual Code Signing
!Cname ms-code-com
1 3 6 1 4 1 311 2 1 22	: msCodeCom		: Microsoft Commercial Code Signing
!Cname ms-ctl-sign
1 3 6 1 4 1 311 10 3 1	: msCTLSign		: Microsoft Trust List Signing
!Cname ms-sgc
1 3 6 1 4 1 311 10 3 3	: msSGC			: Microsoft Server Gated Crypto
!Cname ms-efs
1 3 6 1 4 1 311 10 3 4	: msEFS			: Microsoft Encrypted File System
!Cname ms-smartcard-login
1 3 6 1 4 1 311 20 2 2	: msSmartcardLogin	: Microsoft Smartcard Login
!Cname ms-upn
1 3 6 1 4 1 311 20 2 3	: msUPN			: Microsoft User Principal Name

1 3 6 1 4 1 188 7 1 1 2	: IDEA-CBC		: idea-cbc
			: IDEA-ECB		: idea-ecb
!Cname idea-cfb64
			: IDEA-CFB		: idea-cfb
!Cname idea-ofb64
			: IDEA-OFB		: idea-ofb

1 3 6 1 4 1 3029 1 2	: BF-CBC		: bf-cbc
			: BF-ECB		: bf-ecb
!Cname bf-cfb64
			: BF-CFB		: bf-cfb
!Cname bf-ofb64
			: BF-OFB		: bf-ofb

!Cname id-pkix
1 3 6 1 5 5 7		: PKIX

# PKIX Arcs
id-pkix 0		: id-pkix-mod
id-pkix 1		: id-pe
id-pkix 2		: id-qt
id-pkix 3		: id-kp
id-pkix 4		: id-it
id-pkix 5		: id-pkip
id-pkix 6		: id-alg
id-pkix 7		: id-cmc
id-pkix 8		: id-on
id-pkix 9		: id-pda
id-pkix 10		: id-aca
id-pkix 11		: id-qcs
id-pkix 12		: id-cct
id-pkix 21		: id-ppl
id-pkix 48		: id-ad

# PKIX Modules
id-pkix-mod 1		: id-pkix1-explicit-88
id-pkix-mod 2		: id-pkix1-implicit-88
id-pkix-mod 3		: id-pkix1-explicit-93
id-pkix-mod 4		: id-pkix1-implicit-93
id-pkix-mod 5		: id-mod-crmf
id-pkix-mod 6		: id-mod-cmc
id-pkix-mod 7		: id-mod-kea-profile-88
id-pkix-mod 8		: id-mod-kea-profile-93
id-pkix-mod 9		: id-mod-cmp
id-pkix-mod 10		: id-mod-qualified-cert-88
id-pkix-mod 11		: id-mod-qualified-cert-93
id-pkix-mod 12		: id-mod-attribute-cert
id-pkix-mod 13		: id-mod-timestamp-protocol
id-pkix-mod 14		: id-mod-ocsp
id-pkix-mod 15		: id-mod-dvcs
id-pkix-mod 16		: id-mod-cmp2000

# PKIX Private Extensions
!Cname info-access
id-pe 1			: authorityInfoAccess	: Authority Information Access
id-pe 2			: biometricInfo		: Biometric Info
id-pe 3			: qcStatements
id-pe 4			: ac-auditEntity
id-pe 5			: ac-targeting
id-pe 6			: aaControls
id-pe 7			: sbgp-ipAddrBlock
id-pe 8			: sbgp-autonomousSysNum
id-pe 9			: sbgp-routerIdentifier
id-pe 10		: ac-proxying
!Cname sinfo-access
id-pe 11		: subjectInfoAccess	: Subject Information Access
id-pe 14		: proxyCertInfo		: Proxy Certificate Information
id-pe 24		: tlsfeature		: TLS Feature

# PKIX policyQualifiers for Internet policy qualifiers
id-qt 1			: id-qt-cps		: Policy Qualifier CPS
id-qt 2			: id-qt-unotice		: Policy Qualifier User Notice
id-qt 3			: textNotice

# PKIX key purpose identifiers
!Cname server-auth
id-kp 1			: serverAuth		: TLS Web Server Authentication
!Cname client-auth
id-kp 2			: clientAuth		: TLS Web Client Authentication
!Cname code-sign
id-kp 3			: codeSigning		: Code Signing
!Cname email-protect
id-kp 4			: emailProtection	: E-mail Protection
id-kp 5			: ipsecEndSystem	: IPSec End System
id-kp 6			: ipsecTunnel		: IPSec Tunnel
id-kp 7			: ipsecUser		: IPSec User
!Cname time-stamp
id-kp 8			: timeStamping		: Time Stamping
# From OCSP spec RFC2560
!Cname OCSP-sign
id-kp 9			: OCSPSigning		: OCSP Signing
id-kp 10		: DVCS			: dvcs
!Cname ipsec-IKE
id-kp 17                : ipsecIKE              : ipsec Internet Key Exchange
id-kp 18                : capwapAC              : Ctrl/provision WAP Access
id-kp 19                : capwapWTP             : Ctrl/Provision WAP Termination
!Cname sshClient
id-kp 21                : secureShellClient     : SSH Client
!Cname sshServer
id-kp 22                : secureShellServer     : SSH Server
id-kp 23                : sendRouter            : Send Router
id-kp 24                : sendProxiedRouter     : Send Proxied Router
id-kp 25                : sendOwner             : Send Owner
id-kp 26                : sendProxiedOwner      : Send Proxied Owner
id-kp 27                : cmcCA                 : CMC Certificate Authority
id-kp 28                : cmcRA                 : CMC Registration Authority

# CMP information types
id-it 1			: id-it-caProtEncCert
id-it 2			: id-it-signKeyPairTypes
id-it 3			: id-it-encKeyPairTypes
id-it 4			: id-it-preferredSymmAlg
id-it 5			: id-it-caKeyUpdateInfo
id-it 6			: id-it-currentCRL
id-it 7			: id-it-unsupportedOIDs
# obsolete
id-it 8			: id-it-subscriptionRequest
# obsolete
id-it 9			: id-it-subscriptionResponse
id-it 10		: id-it-keyPairParamReq
id-it 11		: id-it-keyPairParamRep
id-it 12		: id-it-revPassphrase
id-it 13		: id-it-implicitConfirm
id-it 14		: id-it-confirmWaitTime
id-it 15		: id-it-origPKIMessage
id-it 16		: id-it-suppLangTags

# CRMF registration
id-pkip 1		: id-regCtrl
id-pkip 2		: id-regInfo

# CRMF registration controls
id-regCtrl 1		: id-regCtrl-regToken
id-regCtrl 2		: id-regCtrl-authenticator
id-regCtrl 3		: id-regCtrl-pkiPublicationInfo
id-regCtrl 4		: id-regCtrl-pkiArchiveOptions
id-regCtrl 5		: id-regCtrl-oldCertID
id-regCtrl 6		: id-regCtrl-protocolEncrKey

# CRMF registration information
id-regInfo 1		: id-regInfo-utf8Pairs
id-regInfo 2		: id-regInfo-certReq

# algorithms
id-alg 1		: id-alg-des40
id-alg 2		: id-alg-noSignature
id-alg 3		: id-alg-dh-sig-hmac-sha1
id-alg 4		: id-alg-dh-pop

# CMC controls
id-cmc 1		: id-cmc-statusInfo
id-cmc 2		: id-cmc-identification
id-cmc 3		: id-cmc-identityProof
id-cmc 4		: id-cmc-dataReturn
id-cmc 5		: id-cmc-transactionId
id-cmc 6		: id-cmc-senderNonce
id-cmc 7		: id-cmc-recipientNonce
id-cmc 8		: id-cmc-addExtensions
id-cmc 9		: id-cmc-encryptedPOP
id-cmc 10		: id-cmc-decryptedPOP
id-cmc 11		: id-cmc-lraPOPWitness
id-cmc 15		: id-cmc-getCert
id-cmc 16		: id-cmc-getCRL
id-cmc 17		: id-cmc-revokeRequest
id-cmc 18		: id-cmc-regInfo
id-cmc 19		: id-cmc-responseInfo
id-cmc 21		: id-cmc-queryPending
id-cmc 22		: id-cmc-popLinkRandom
id-cmc 23		: id-cmc-popLinkWitness
id-cmc 24		: id-cmc-confirmCertAcceptance

# other names
id-on 1			: id-on-personalData
id-on 3			: id-on-permanentIdentifier : Permanent Identifier
id-on 5			: id-on-xmppAddr : XmppAddr
id-on 7			: id-on-dnsSRV : SRVName
id-on 8			: id-on-NAIRealm : NAIRealm
id-on 9			: id-on-SmtpUTF8Mailbox : Smtp UTF8 Mailbox

# personal data attributes
id-pda 1		: id-pda-dateOfBirth
id-pda 2		: id-pda-placeOfBirth
id-pda 3		: id-pda-gender
id-pda 4		: id-pda-countryOfCitizenship
id-pda 5		: id-pda-countryOfResidence

# attribute certificate attributes
id-aca 1		: id-aca-authenticationInfo
id-aca 2		: id-aca-accessIdentity
id-aca 3		: id-aca-chargingIdentity
id-aca 4		: id-aca-group
# attention : the following seems to be obsolete, replace by 'role'
id-aca 5		: id-aca-role
id-aca 6		: id-aca-encAttrs

# qualified certificate statements
id-qcs 1		: id-qcs-pkixQCSyntax-v1

# CMC content types
id-cct 1		: id-cct-crs
id-cct 2		: id-cct-PKIData
id-cct 3		: id-cct-PKIResponse

# Predefined Proxy Certificate policy languages
id-ppl 0		: id-ppl-anyLanguage	: Any language
id-ppl 1		: id-ppl-inheritAll	: Inherit all
id-ppl 2		: id-ppl-independent	: Independent

# access descriptors for authority info access extension
!Cname ad-OCSP
id-ad 1			: OCSP			: OCSP
!Cname ad-ca-issuers
id-ad 2			: caIssuers		: CA Issuers
!Cname ad-timeStamping
id-ad 3			: ad_timestamping	: AD Time Stamping
!Cname ad-dvcs
id-ad 4			: AD_DVCS		: ad dvcs
id-ad 5			: caRepository		: CA Repository


!Alias id-pkix-OCSP ad-OCSP
!module id-pkix-OCSP
!Cname basic
id-pkix-OCSP 1		: basicOCSPResponse	: Basic OCSP Response
id-pkix-OCSP 2		: Nonce			: OCSP Nonce
id-pkix-OCSP 3		: CrlID			: OCSP CRL ID
id-pkix-OCSP 4		: acceptableResponses	: Acceptable OCSP Responses
id-pkix-OCSP 5		: noCheck		: OCSP No Check
id-pkix-OCSP 6		: archiveCutoff		: OCSP Archive Cutoff
id-pkix-OCSP 7		: serviceLocator	: OCSP Service Locator
id-pkix-OCSP 8		: extendedStatus	: Extended OCSP Status
id-pkix-OCSP 9		: valid
id-pkix-OCSP 10		: path
id-pkix-OCSP 11		: trustRoot		: Trust Root
!global

1 3 14 3 2		: algorithm		: algorithm
algorithm 3		: RSA-NP-MD5		: md5WithRSA
algorithm 6		: DES-ECB		: des-ecb
algorithm 7		: DES-CBC		: des-cbc
!Cname des-ofb64
algorithm 8		: DES-OFB		: des-ofb
!Cname des-cfb64
algorithm 9		: DES-CFB		: des-cfb
algorithm 11		: rsaSignature
!Cname dsa-2
algorithm 12		: DSA-old		: dsaEncryption-old
algorithm 13		: DSA-SHA		: dsaWithSHA
algorithm 15		: RSA-SHA		: shaWithRSAEncryption
!Cname des-ede-ecb
algorithm 17		: DES-EDE		: des-ede
!Cname des-ede3-ecb
			: DES-EDE3		: des-ede3
			: DES-EDE-CBC		: des-ede-cbc
!Cname des-ede-cfb64
			: DES-EDE-CFB		: des-ede-cfb
!Cname des-ede3-cfb64
			: DES-EDE3-CFB		: des-ede3-cfb
!Cname des-ede-ofb64
			: DES-EDE-OFB		: des-ede-ofb
!Cname des-ede3-ofb64
			: DES-EDE3-OFB		: des-ede3-ofb
			: DESX-CBC		: desx-cbc
algorithm 18		: SHA			: sha
algorithm 26		: SHA1			: sha1
!Cname dsaWithSHA1-2
algorithm 27		: DSA-SHA1-old		: dsaWithSHA1-old
algorithm 29		: RSA-SHA1-2		: sha1WithRSA

1 3 36 3 2 1		: RIPEMD160		: ripemd160
1 3 36 3 3 1 2		: RSA-RIPEMD160		: ripemd160WithRSA

1 3 6 1 4 1 1722 12 2 1 : BLAKE2BMAC	        : blake2bmac
1 3 6 1 4 1 1722 12 2 2 : BLAKE2SMAC   	        : blake2smac
blake2bmac 16           : BLAKE2b512            : blake2b512
blake2smac 8            : BLAKE2s256            : blake2s256

!Cname sxnet
1 3 101 1 4 1		: SXNetID		: Strong Extranet ID

2 5			: X500			: directory services (X.500)

X500 4			: X509
X509 3			: CN			: commonName
X509 4			: SN			: surname
X509 5			: 			: serialNumber
X509 6			: C			: countryName
X509 7			: L			: localityName
X509 8			: ST			: stateOrProvinceName
X509 9			: street		: streetAddress
X509 10			: O			: organizationName
X509 11			: OU			: organizationalUnitName
X509 12			: title			: title
X509 13			: 			: description
X509 14			: 			: searchGuide
X509 15			: 			: businessCategory
X509 16			: 			: postalAddress
X509 17			: 			: postalCode
X509 18			: 			: postOfficeBox
X509 19			: 			: physicalDeliveryOfficeName
X509 20			: 			: telephoneNumber
X509 21			: 			: telexNumber
X509 22			: 			: teletexTerminalIdentifier
X509 23			: 			: facsimileTelephoneNumber
X509 24			: 			: x121Address
X509 25			: 			: internationaliSDNNumber
X509 26			: 			: registeredAddress
X509 27			: 			: destinationIndicator
X509 28			: 			: preferredDeliveryMethod
X509 29			: 			: presentationAddress
X509 30			: 			: supportedApplicationContext
X509 31			: member		:
X509 32			: owner			:
X509 33			: 			: roleOccupant
X509 34			: seeAlso		:
X509 35			: 			: userPassword
X509 36			: 			: userCertificate
X509 37			: 			: cACertificate
X509 38			: 			: authorityRevocationList
X509 39			: 			: certificateRevocationList
X509 40			: 			: crossCertificatePair
X509 41			: name			: name
X509 42			: GN			: givenName
X509 43			: initials		: initials
X509 44			: 			: generationQualifier
X509 45			: 			: x500UniqueIdentifier
X509 46			: dnQualifier		: dnQualifier
X509 47			: 			: enhancedSearchGuide
X509 48			: 			: protocolInformation
X509 49			: 			: distinguishedName
X509 50			: 			: uniqueMember
X509 51			: 			: houseIdentifier
X509 52			: 			: supportedAlgorithms
X509 53			: 			: deltaRevocationList
X509 54			: dmdName		:
X509 65			:			: pseudonym
X509 72			: role			: role
X509 97                 :			: organizationIdentifier
X509 98			: c3			: countryCode3c
X509 99			: n3			: countryCode3n
X509 100		:			: dnsName


X500 8			: X500algorithms	: directory services - algorithms
X500algorithms 1 1	: RSA			: rsa
X500algorithms 3 100	: RSA-MDC2		: mdc2WithRSA
X500algorithms 3 101	: MDC2			: mdc2

X500 29			: id-ce
!Cname subject-directory-attributes
id-ce 9			: subjectDirectoryAttributes : X509v3 Subject Directory Attributes
!Cname subject-key-identifier
id-ce 14		: subjectKeyIdentifier	: X509v3 Subject Key Identifier
!Cname key-usage
id-ce 15		: keyUsage		: X509v3 Key Usage
!Cname private-key-usage-period
id-ce 16		: privateKeyUsagePeriod	: X509v3 Private Key Usage Period
!Cname subject-alt-name
id-ce 17		: subjectAltName	: X509v3 Subject Alternative Name
!Cname issuer-alt-name
id-ce 18		: issuerAltName		: X509v3 Issuer Alternative Name
!Cname basic-constraints
id-ce 19		: basicConstraints	: X509v3 Basic Constraints
!Cname crl-number
id-ce 20		: crlNumber		: X509v3 CRL Number
!Cname crl-reason
id-ce 21		: CRLReason		: X509v3 CRL Reason Code
!Cname invalidity-date
id-ce 24		: invalidityDate	: Invalidity Date
!Cname delta-crl
id-ce 27		: deltaCRL		: X509v3 Delta CRL Indicator
!Cname issuing-distribution-point
id-ce 28		: issuingDistributionPoint : X509v3 Issuing Distribution Point
!Cname certificate-issuer
id-ce 29		: certificateIssuer	: X509v3 Certificate Issuer
!Cname name-constraints
id-ce 30		: nameConstraints	: X509v3 Name Constraints
!Cname crl-distribution-points
id-ce 31		: crlDistributionPoints	: X509v3 CRL Distribution Points
!Cname certificate-policies
id-ce 32		: certificatePolicies	: X509v3 Certificate Policies
!Cname any-policy
certificate-policies 0	: anyPolicy		: X509v3 Any Policy
!Cname policy-mappings
id-ce 33		: policyMappings	: X509v3 Policy Mappings
!Cname authority-key-identifier
id-ce 35		: authorityKeyIdentifier : X509v3 Authority Key Identifier
!Cname policy-constraints
id-ce 36		: policyConstraints	: X509v3 Policy Constraints
!Cname ext-key-usage
id-ce 37		: extendedKeyUsage	: X509v3 Extended Key Usage
!Cname freshest-crl
id-ce 46		: freshestCRL		: X509v3 Freshest CRL
!Cname inhibit-any-policy
id-ce 54		: inhibitAnyPolicy	: X509v3 Inhibit Any Policy
!Cname target-information
id-ce 55		: targetInformation	: X509v3 AC Targeting
!Cname no-rev-avail
id-ce 56		: noRevAvail		: X509v3 No Revocation Available

# From RFC5280
ext-key-usage 0		: anyExtendedKeyUsage	: Any Extended Key Usage


!Cname netscape
2 16 840 1 113730	: Netscape		: Netscape Communications Corp.
!Cname netscape-cert-extension
netscape 1		: nsCertExt		: Netscape Certificate Extension
!Cname netscape-data-type
netscape 2		: nsDataType		: Netscape Data Type
!Cname netscape-cert-type
netscape-cert-extension 1 : nsCertType		: Netscape Cert Type
!Cname netscape-base-url
netscape-cert-extension 2 : nsBaseUrl		: Netscape Base Url
!Cname netscape-revocation-url
netscape-cert-extension 3 : nsRevocationUrl	: Netscape Revocation Url
!Cname netscape-ca-revocation-url
netscape-cert-extension 4 : nsCaRevocationUrl	: Netscape CA Revocation Url
!Cname netscape-renewal-url
netscape-cert-extension 7 : nsRenewalUrl	: Netscape Renewal Url
!Cname netscape-ca-policy-url
netscape-cert-extension 8 : nsCaPolicyUrl	: Netscape CA Policy Url
!Cname netscape-ssl-server-name
netscape-cert-extension 12 : nsSslServerName	: Netscape SSL Server Name
!Cname netscape-comment
netscape-cert-extension 13 : nsComment		: Netscape Comment
!Cname netscape-cert-sequence
netscape-data-type 5	: nsCertSequence	: Netscape Certificate Sequence
!Cname ns-sgc
netscape 4 1		: nsSGC			: Netscape Server Gated Crypto

# iso(1)
iso 3			: ORG			: org
org 6			: DOD			: dod
dod 1			: IANA			: iana
!Alias internet iana

internet 1		: directory		: Directory
internet 2		: mgmt			: Management
internet 3		: experimental		: Experimental
internet 4		: private		: Private
internet 5		: security		: Security
internet 6		: snmpv2		: SNMPv2
# Documents refer to "internet 7" as "mail". This however leads to ambiguities
# with RFC2798, Section 9.1.3, where "mail" is defined as the short name for
# rfc822Mailbox. The short name is therefore here left out for a reason.
# Subclasses of "mail", e.g. "MIME MHS" don't constitute a problem, as
# references are realized via long name "Mail" (with capital M).
internet 7		:			: Mail

Private 1		: enterprises		: Enterprises

# RFC 2247
Enterprises 1466 344	: dcobject		: dcObject

# RFC 1495
Mail 1			: mime-mhs		: MIME MHS
mime-mhs 1		: mime-mhs-headings	: mime-mhs-headings
mime-mhs 2		: mime-mhs-bodies	: mime-mhs-bodies
mime-mhs-headings 1	: id-hex-partial-message : id-hex-partial-message
mime-mhs-headings 2	: id-hex-multipart-message : id-hex-multipart-message

# RFC 3274
!Cname zlib-compression
id-smime-alg 8		: ZLIB			: zlib compression

# AES aka Rijndael

!Alias csor 2 16 840 1 101 3
!Alias nistAlgorithms csor 4
!Alias aes nistAlgorithms 1

aes 1			: AES-128-ECB		: aes-128-ecb
aes 2			: AES-128-CBC		: aes-128-cbc
!Cname aes-128-ofb128
aes 3			: AES-128-OFB		: aes-128-ofb
!Cname aes-128-cfb128
aes 4			: AES-128-CFB		: aes-128-cfb
aes 5			: id-aes128-wrap
aes 6			: id-aes128-GCM		: aes-128-gcm
aes 7			: id-aes128-CCM		: aes-128-ccm
aes 8			: id-aes128-wrap-pad

aes 21			: AES-192-ECB		: aes-192-ecb
aes 22			: AES-192-CBC		: aes-192-cbc
!Cname aes-192-ofb128
aes 23			: AES-192-OFB		: aes-192-ofb
!Cname aes-192-cfb128
aes 24			: AES-192-CFB		: aes-192-cfb
aes 25			: id-aes192-wrap
aes 26			: id-aes192-GCM		: aes-192-gcm
aes 27			: id-aes192-CCM		: aes-192-ccm
aes 28			: id-aes192-wrap-pad

aes 41			: AES-256-ECB		: aes-256-ecb
aes 42			: AES-256-CBC		: aes-256-cbc
!Cname aes-256-ofb128
aes 43			: AES-256-OFB		: aes-256-ofb
!Cname aes-256-cfb128
aes 44			: AES-256-CFB		: aes-256-cfb
aes 45			: id-aes256-wrap
aes 46			: id-aes256-GCM		: aes-256-gcm
aes 47			: id-aes256-CCM		: aes-256-ccm
aes 48			: id-aes256-wrap-pad

ieee-siswg 0 1 1        : AES-128-XTS		: aes-128-xts
ieee-siswg 0 1 2        : AES-256-XTS		: aes-256-xts

# There are no OIDs for these modes...

			: AES-128-CFB1		: aes-128-cfb1
			: AES-192-CFB1		: aes-192-cfb1
			: AES-256-CFB1		: aes-256-cfb1
			: AES-128-CFB8		: aes-128-cfb8
			: AES-192-CFB8		: aes-192-cfb8
			: AES-256-CFB8		: aes-256-cfb8
			: AES-128-CTR		: aes-128-ctr
			: AES-192-CTR		: aes-192-ctr
			: AES-256-CTR		: aes-256-ctr
			: AES-128-OCB		: aes-128-ocb
			: AES-192-OCB		: aes-192-ocb
			: AES-256-OCB		: aes-256-ocb
			: DES-CFB1		: des-cfb1
			: DES-CFB8		: des-cfb8
			: DES-EDE3-CFB1		: des-ede3-cfb1
			: DES-EDE3-CFB8		: des-ede3-cfb8

# OIDs for SHA224, SHA256, SHA385 and SHA512, according to x9.84 and
# http://csrc.nist.gov/groups/ST/crypto_apps_infra/csor/algorithms.html
# "Middle" names are specified to be id-sha256, id-sha384, etc., but
# we adhere to unprefixed capitals for backward compatibility...
!Alias nist_hashalgs nistAlgorithms 2
nist_hashalgs 1		: SHA256		: sha256
nist_hashalgs 2		: SHA384		: sha384
nist_hashalgs 3		: SHA512		: sha512
nist_hashalgs 4		: SHA224		: sha224
nist_hashalgs 5		: SHA512-224		: sha512-224
nist_hashalgs 6		: SHA512-256		: sha512-256
nist_hashalgs 7		: SHA3-224		: sha3-224
nist_hashalgs 8		: SHA3-256		: sha3-256
nist_hashalgs 9		: SHA3-384		: sha3-384
nist_hashalgs 10	: SHA3-512		: sha3-512
nist_hashalgs 11	: SHAKE128		: shake128
nist_hashalgs 12	: SHAKE256		: shake256
nist_hashalgs 13	: id-hmacWithSHA3-224	: hmac-sha3-224
nist_hashalgs 14	: id-hmacWithSHA3-256	: hmac-sha3-256
nist_hashalgs 15	: id-hmacWithSHA3-384	: hmac-sha3-384
nist_hashalgs 16	: id-hmacWithSHA3-512	: hmac-sha3-512
# Below two are incomplete OIDs, to be uncommented when we figure out
# how to handle them...
# nist_hashalgs 17	: id-shake128-len	: shake128-len
# nist_hashalgs 18	: id-shake256-len	: shake256-len
nist_hashalgs 19        : KMAC128               : kmac128
nist_hashalgs 20        : KMAC256               : kmac256
# nist_hashalgs 21      : KMAC128-XOF           : kmac128-xof
# nist_hashalgs 22      : KMAC256-XOF           : kmac256-xof

# OIDs for dsa-with-sha224 and dsa-with-sha256
!Alias dsa_with_sha2 nistAlgorithms 3
dsa_with_sha2 1		: dsa_with_SHA224
dsa_with_sha2 2		: dsa_with_SHA256
# Above two belong below, but kept as they are for backward compatibility
!Alias sigAlgs nistAlgorithms 3
sigAlgs 3	: id-dsa-with-sha384	: dsa_with_SHA384
sigAlgs 4	: id-dsa-with-sha512	: dsa_with_SHA512
sigAlgs 5	: id-dsa-with-sha3-224	: dsa_with_SHA3-224
sigAlgs 6	: id-dsa-with-sha3-256	: dsa_with_SHA3-256
sigAlgs 7	: id-dsa-with-sha3-384	: dsa_with_SHA3-384
sigAlgs 8	: id-dsa-with-sha3-512	: dsa_with_SHA3-512
sigAlgs 9	: id-ecdsa-with-sha3-224	: ecdsa_with_SHA3-224
sigAlgs 10	: id-ecdsa-with-sha3-256	: ecdsa_with_SHA3-256
sigAlgs 11	: id-ecdsa-with-sha3-384	: ecdsa_with_SHA3-384
sigAlgs 12	: id-ecdsa-with-sha3-512	: ecdsa_with_SHA3-512
sigAlgs 13	: id-rsassa-pkcs1-v1_5-with-sha3-224	: RSA-SHA3-224
sigAlgs 14	: id-rsassa-pkcs1-v1_5-with-sha3-256	: RSA-SHA3-256
sigAlgs 15	: id-rsassa-pkcs1-v1_5-with-sha3-384	: RSA-SHA3-384
sigAlgs 16	: id-rsassa-pkcs1-v1_5-with-sha3-512	: RSA-SHA3-512

# Hold instruction CRL entry extension
!Cname hold-instruction-code
id-ce 23		: holdInstructionCode	: Hold Instruction Code
!Alias holdInstruction	X9-57 2
!Cname hold-instruction-none
holdInstruction 1	: holdInstructionNone	: Hold Instruction None
!Cname hold-instruction-call-issuer
holdInstruction 2	: holdInstructionCallIssuer : Hold Instruction Call Issuer
!Cname hold-instruction-reject
holdInstruction 3	: holdInstructionReject	: Hold Instruction Reject

# OID's from ITU-T.  Most of this is defined in RFC 1274.  A couple of
# them are also mentioned in RFC 2247
itu-t 9			: data
data 2342		: pss
pss 19200300		: ucl
ucl 100			: pilot
pilot 1			:			: pilotAttributeType
pilot 3			:			: pilotAttributeSyntax
pilot 4			:			: pilotObjectClass
pilot 10		:			: pilotGroups
pilotAttributeSyntax 4	:			: iA5StringSyntax
pilotAttributeSyntax 5	:			: caseIgnoreIA5StringSyntax
pilotObjectClass 3	:			: pilotObject
pilotObjectClass 4	:			: pilotPerson
pilotObjectClass 5	: account
pilotObjectClass 6	: document
pilotObjectClass 7	: room
pilotObjectClass 9	:			: documentSeries
pilotObjectClass 13	: domain		: Domain
pilotObjectClass 14	:			: rFC822localPart
pilotObjectClass 15	:			: dNSDomain
pilotObjectClass 17	:			: domainRelatedObject
pilotObjectClass 18	:			: friendlyCountry
pilotObjectClass 19	:			: simpleSecurityObject
pilotObjectClass 20	:			: pilotOrganization
pilotObjectClass 21	:			: pilotDSA
pilotObjectClass 22	:			: qualityLabelledData
pilotAttributeType 1	: UID			: userId
pilotAttributeType 2	:			: textEncodedORAddress
pilotAttributeType 3	: mail			: rfc822Mailbox
pilotAttributeType 4	: info
pilotAttributeType 5	:			: favouriteDrink
pilotAttributeType 6	:			: roomNumber
pilotAttributeType 7	: photo
pilotAttributeType 8	:			: userClass
pilotAttributeType 9	: host
pilotAttributeType 10	: manager
pilotAttributeType 11	:			: documentIdentifier
pilotAttributeType 12	:			: documentTitle
pilotAttributeType 13	:			: documentVersion
pilotAttributeType 14	:			: documentAuthor
pilotAttributeType 15	:			: documentLocation
pilotAttributeType 20	:			: homeTelephoneNumber
pilotAttributeType 21	: secretary
pilotAttributeType 22	:			: otherMailbox
pilotAttributeType 23	:			: lastModifiedTime
pilotAttributeType 24	:			: lastModifiedBy
pilotAttributeType 25	: DC			: domainComponent
pilotAttributeType 26	:			: aRecord
pilotAttributeType 27	:			: pilotAttributeType27
pilotAttributeType 28	:			: mXRecord
pilotAttributeType 29	:			: nSRecord
pilotAttributeType 30	:			: sOARecord
pilotAttributeType 31	:			: cNAMERecord
pilotAttributeType 37	:			: associatedDomain
pilotAttributeType 38	:			: associatedName
pilotAttributeType 39	:			: homePostalAddress
pilotAttributeType 40	:			: personalTitle
pilotAttributeType 41	:			: mobileTelephoneNumber
pilotAttributeType 42	:			: pagerTelephoneNumber
pilotAttributeType 43	:			: friendlyCountryName
pilotAttributeType 44	: uid			: uniqueIdentifier
pilotAttributeType 45	:			: organizationalStatus
pilotAttributeType 46	:			: janetMailbox
pilotAttributeType 47	:			: mailPreferenceOption
pilotAttributeType 48	:			: buildingName
pilotAttributeType 49	:			: dSAQuality
pilotAttributeType 50	:			: singleLevelQuality
pilotAttributeType 51	:			: subtreeMinimumQuality
pilotAttributeType 52	:			: subtreeMaximumQuality
pilotAttributeType 53	:			: personalSignature
pilotAttributeType 54	:			: dITRedirect
pilotAttributeType 55	: audio
pilotAttributeType 56	:			: documentPublisher

international-organizations 42	: id-set	: Secure Electronic Transactions

id-set 0		: set-ctype		: content types
id-set 1		: set-msgExt		: message extensions
id-set 3		: set-attr
id-set 5		: set-policy
id-set 7		: set-certExt		: certificate extensions
id-set 8		: set-brand

set-ctype 0		: setct-PANData
set-ctype 1		: setct-PANToken
set-ctype 2		: setct-PANOnly
set-ctype 3		: setct-OIData
set-ctype 4		: setct-PI
set-ctype 5		: setct-PIData
set-ctype 6		: setct-PIDataUnsigned
set-ctype 7		: setct-HODInput
set-ctype 8		: setct-AuthResBaggage
set-ctype 9		: setct-AuthRevReqBaggage
set-ctype 10		: setct-AuthRevResBaggage
set-ctype 11		: setct-CapTokenSeq
set-ctype 12		: setct-PInitResData
set-ctype 13		: setct-PI-TBS
set-ctype 14		: setct-PResData
set-ctype 16		: setct-AuthReqTBS
set-ctype 17		: setct-AuthResTBS
set-ctype 18		: setct-AuthResTBSX
set-ctype 19		: setct-AuthTokenTBS
set-ctype 20		: setct-CapTokenData
set-ctype 21		: setct-CapTokenTBS
set-ctype 22		: setct-AcqCardCodeMsg
set-ctype 23		: setct-AuthRevReqTBS
set-ctype 24		: setct-AuthRevResData
set-ctype 25		: setct-AuthRevResTBS
set-ctype 26		: setct-CapReqTBS
set-ctype 27		: setct-CapReqTBSX
set-ctype 28		: setct-CapResData
set-ctype 29		: setct-CapRevReqTBS
set-ctype 30		: setct-CapRevReqTBSX
set-ctype 31		: setct-CapRevResData
set-ctype 32		: setct-CredReqTBS
set-ctype 33		: setct-CredReqTBSX
set-ctype 34		: setct-CredResData
set-ctype 35		: setct-CredRevReqTBS
set-ctype 36		: setct-CredRevReqTBSX
set-ctype 37		: setct-CredRevResData
set-ctype 38		: setct-PCertReqData
set-ctype 39		: setct-PCertResTBS
set-ctype 40		: setct-BatchAdminReqData
set-ctype 41		: setct-BatchAdminResData
set-ctype 42		: setct-CardCInitResTBS
set-ctype 43		: setct-MeAqCInitResTBS
set-ctype 44		: setct-RegFormResTBS
set-ctype 45		: setct-CertReqData
set-ctype 46		: setct-CertReqTBS
set-ctype 47		: setct-CertResData
set-ctype 48		: setct-CertInqReqTBS
set-ctype 49		: setct-ErrorTBS
set-ctype 50		: setct-PIDualSignedTBE
set-ctype 51		: setct-PIUnsignedTBE
set-ctype 52		: setct-AuthReqTBE
set-ctype 53		: setct-AuthResTBE
set-ctype 54		: setct-AuthResTBEX
set-ctype 55		: setct-AuthTokenTBE
set-ctype 56		: setct-CapTokenTBE
set-ctype 57		: setct-CapTokenTBEX
set-ctype 58		: setct-AcqCardCodeMsgTBE
set-ctype 59		: setct-AuthRevReqTBE
set-ctype 60		: setct-AuthRevResTBE
set-ctype 61		: setct-AuthRevResTBEB
set-ctype 62		: setct-CapReqTBE
set-ctype 63		: setct-CapReqTBEX
set-ctype 64		: setct-CapResTBE
set-ctype 65		: setct-CapRevReqTBE
set-ctype 66		: setct-CapRevReqTBEX
set-ctype 67		: setct-CapRevResTBE
set-ctype 68		: setct-CredReqTBE
set-ctype 69		: setct-CredReqTBEX
set-ctype 70		: setct-CredResTBE
set-ctype 71		: setct-CredRevReqTBE
set-ctype 72		: setct-CredRevReqTBEX
set-ctype 73		: setct-CredRevResTBE
set-ctype 74		: setct-BatchAdminReqTBE
set-ctype 75		: setct-BatchAdminResTBE
set-ctype 76		: setct-RegFormReqTBE
set-ctype 77		: setct-CertReqTBE
set-ctype 78		: setct-CertReqTBEX
set-ctype 79		: setct-CertResTBE
set-ctype 80		: setct-CRLNotificationTBS
set-ctype 81		: setct-CRLNotificationResTBS
set-ctype 82		: setct-BCIDistributionTBS

set-msgExt 1		: setext-genCrypt	: generic cryptogram
set-msgExt 3		: setext-miAuth		: merchant initiated auth
set-msgExt 4		: setext-pinSecure
set-msgExt 5		: setext-pinAny
set-msgExt 7		: setext-track2
set-msgExt 8		: setext-cv		: additional verification

set-policy 0		: set-policy-root

set-certExt 0		: setCext-hashedRoot
set-certExt 1		: setCext-certType
set-certExt 2		: setCext-merchData
set-certExt 3		: setCext-cCertRequired
set-certExt 4		: setCext-tunneling
set-certExt 5		: setCext-setExt
set-certExt 6		: setCext-setQualf
set-certExt 7		: setCext-PGWYcapabilities
set-certExt 8		: setCext-TokenIdentifier
set-certExt 9		: setCext-Track2Data
set-certExt 10		: setCext-TokenType
set-certExt 11		: setCext-IssuerCapabilities

set-attr 0		: setAttr-Cert
set-attr 1		: setAttr-PGWYcap	: payment gateway capabilities
set-attr 2		: setAttr-TokenType
set-attr 3		: setAttr-IssCap	: issuer capabilities

setAttr-Cert 0		: set-rootKeyThumb
setAttr-Cert 1		: set-addPolicy

setAttr-TokenType 1	: setAttr-Token-EMV
setAttr-TokenType 2	: setAttr-Token-B0Prime

setAttr-IssCap 3	: setAttr-IssCap-CVM
setAttr-IssCap 4	: setAttr-IssCap-T2
setAttr-IssCap 5	: setAttr-IssCap-Sig

setAttr-IssCap-CVM 1	: setAttr-GenCryptgrm	: generate cryptogram
setAttr-IssCap-T2 1	: setAttr-T2Enc		: encrypted track 2
setAttr-IssCap-T2 2	: setAttr-T2cleartxt	: cleartext track 2

setAttr-IssCap-Sig 1	: setAttr-TokICCsig	: ICC or token signature
setAttr-IssCap-Sig 2	: setAttr-SecDevSig	: secure device signature

set-brand 1		: set-brand-IATA-ATA
set-brand 30		: set-brand-Diners
set-brand 34		: set-brand-AmericanExpress
set-brand 35		: set-brand-JCB
set-brand 4		: set-brand-Visa
set-brand 5		: set-brand-MasterCard
set-brand 6011		: set-brand-Novus

rsadsi 3 10		: DES-CDMF		: des-cdmf
rsadsi 1 1 6		: rsaOAEPEncryptionSET

			: Oakley-EC2N-3		: ipsec3
			: Oakley-EC2N-4		: ipsec4

iso 0 10118 3 0 55	: whirlpool

# GOST OIDs

member-body 643 2 2	: cryptopro
member-body 643 2 9	: cryptocom
member-body 643 7 1	: id-tc26

cryptopro 3		: id-GostR3411-94-with-GostR3410-2001 : GOST R 34.11-94 with GOST R 34.10-2001
cryptopro 4		: id-GostR3411-94-with-GostR3410-94 : GOST R 34.11-94 with GOST R 34.10-94
!Cname id-GostR3411-94
cryptopro 9		: md_gost94		: GOST R 34.11-94
cryptopro 10		: id-HMACGostR3411-94	: HMAC GOST 34.11-94
!Cname id-GostR3410-2001
cryptopro 19		: gost2001	: GOST R 34.10-2001
!Cname id-GostR3410-94
cryptopro 20		: gost94	: GOST R 34.10-94
!Cname id-Gost28147-89
cryptopro 21		: gost89 		: GOST 28147-89
			: gost89-cnt
			: gost89-cnt-12
			: gost89-cbc
			: gost89-ecb
			: gost89-ctr
!Cname id-Gost28147-89-MAC
cryptopro 22		: gost-mac	: GOST 28147-89 MAC
			: gost-mac-12
!Cname id-GostR3411-94-prf
cryptopro 23		: prf-gostr3411-94	: GOST R 34.11-94 PRF
cryptopro 98		: id-GostR3410-2001DH	: GOST R 34.10-2001 DH
cryptopro 99		: id-GostR3410-94DH	: GOST R 34.10-94 DH

cryptopro 14 1		: id-Gost28147-89-CryptoPro-KeyMeshing
cryptopro 14 0		: id-Gost28147-89-None-KeyMeshing

# GOST parameter set OIDs

cryptopro 30 0		: id-GostR3411-94-TestParamSet
cryptopro 30 1		: id-GostR3411-94-CryptoProParamSet

cryptopro 31 0		: id-Gost28147-89-TestParamSet
cryptopro 31 1		: id-Gost28147-89-CryptoPro-A-ParamSet
cryptopro 31 2		: id-Gost28147-89-CryptoPro-B-ParamSet
cryptopro 31 3		: id-Gost28147-89-CryptoPro-C-ParamSet
cryptopro 31 4		: id-Gost28147-89-CryptoPro-D-ParamSet
cryptopro 31 5		: id-Gost28147-89-CryptoPro-Oscar-1-1-ParamSet
cryptopro 31 6		: id-Gost28147-89-CryptoPro-Oscar-1-0-ParamSet
cryptopro 31 7		: id-Gost28147-89-CryptoPro-RIC-1-ParamSet

cryptopro 32 0		: id-GostR3410-94-TestParamSet
cryptopro 32 2		: id-GostR3410-94-CryptoPro-A-ParamSet
cryptopro 32 3		: id-GostR3410-94-CryptoPro-B-ParamSet
cryptopro 32 4		: id-GostR3410-94-CryptoPro-C-ParamSet
cryptopro 32 5		: id-GostR3410-94-CryptoPro-D-ParamSet

cryptopro 33 1		: id-GostR3410-94-CryptoPro-XchA-ParamSet
cryptopro 33 2		: id-GostR3410-94-CryptoPro-XchB-ParamSet
cryptopro 33 3		: id-GostR3410-94-CryptoPro-XchC-ParamSet

cryptopro 35 0		: id-GostR3410-2001-TestParamSet
cryptopro 35 1		: id-GostR3410-2001-CryptoPro-A-ParamSet
cryptopro 35 2		: id-GostR3410-2001-CryptoPro-B-ParamSet
cryptopro 35 3		: id-GostR3410-2001-CryptoPro-C-ParamSet

cryptopro 36 0		: id-GostR3410-2001-CryptoPro-XchA-ParamSet
cryptopro 36 1		: id-GostR3410-2001-CryptoPro-XchB-ParamSet

id-GostR3410-94 1	: id-GostR3410-94-a
id-GostR3410-94 2	: id-GostR3410-94-aBis
id-GostR3410-94 3	: id-GostR3410-94-b
id-GostR3410-94 4	: id-GostR3410-94-bBis

# Cryptocom LTD GOST OIDs

cryptocom 1 6 1		: id-Gost28147-89-cc	: GOST 28147-89 Cryptocom ParamSet
!Cname id-GostR3410-94-cc
cryptocom 1 5 3		: gost94cc	: GOST 34.10-94 Cryptocom
!Cname id-GostR3410-2001-cc
cryptocom 1 5 4		: gost2001cc	: GOST 34.10-2001 Cryptocom

cryptocom 1 3 3		: id-GostR3411-94-with-GostR3410-94-cc : GOST R 34.11-94 with GOST R 34.10-94 Cryptocom
cryptocom 1 3 4		: id-GostR3411-94-with-GostR3410-2001-cc : GOST R 34.11-94 with GOST R 34.10-2001 Cryptocom

cryptocom 1 8 1		: id-GostR3410-2001-ParamSet-cc : GOST R 3410-2001 Parameter Set Cryptocom

# TC26 GOST OIDs

id-tc26 1 		: id-tc26-algorithms
id-tc26-algorithms 1	: id-tc26-sign
!Cname id-GostR3410-2012-256
id-tc26-sign 1		: gost2012_256: GOST R 34.10-2012 with 256 bit modulus
!Cname id-GostR3410-2012-512
id-tc26-sign 2		: gost2012_512: GOST R 34.10-2012 with 512 bit modulus

id-tc26-algorithms 2	: id-tc26-digest
!Cname id-GostR3411-2012-256
id-tc26-digest 2	: md_gost12_256: GOST R 34.11-2012 with 256 bit hash
!Cname id-GostR3411-2012-512
id-tc26-digest 3	: md_gost12_512: GOST R 34.11-2012 with 512 bit hash

id-tc26-algorithms 3	: id-tc26-signwithdigest
id-tc26-signwithdigest 2: id-tc26-signwithdigest-gost3410-2012-256: GOST R 34.10-2012 with GOST R 34.11-2012 (256 bit)
id-tc26-signwithdigest 3: id-tc26-signwithdigest-gost3410-2012-512: GOST R 34.10-2012 with GOST R 34.11-2012 (512 bit)

id-tc26-algorithms 4	: id-tc26-mac
id-tc26-mac 1		: id-tc26-hmac-gost-3411-2012-256 : HMAC GOST 34.11-2012 256 bit
id-tc26-mac 2		: id-tc26-hmac-gost-3411-2012-512 : HMAC GOST 34.11-2012 512 bit

id-tc26-algorithms 5	: id-tc26-cipher
id-tc26-cipher 1	:  id-tc26-cipher-gostr3412-2015-magma
id-tc26-cipher-gostr3412-2015-magma 1	: magma-ctr-acpkm
id-tc26-cipher-gostr3412-2015-magma 2	: magma-ctr-acpkm-omac
id-tc26-cipher 2	:  id-tc26-cipher-gostr3412-2015-kuznyechik
id-tc26-cipher-gostr3412-2015-kuznyechik 1	: kuznyechik-ctr-acpkm
id-tc26-cipher-gostr3412-2015-kuznyechik 2	: kuznyechik-ctr-acpkm-omac

id-tc26-algorithms 6	: id-tc26-agreement
id-tc26-agreement 1	: id-tc26-agreement-gost-3410-2012-256
id-tc26-agreement 2	: id-tc26-agreement-gost-3410-2012-512

id-tc26-algorithms 7	:	id-tc26-wrap
id-tc26-wrap 1	: id-tc26-wrap-gostr3412-2015-magma
id-tc26-wrap-gostr3412-2015-magma 1	: magma-kexp15
id-tc26-wrap 2	: id-tc26-wrap-gostr3412-2015-kuznyechik
id-tc26-wrap-gostr3412-2015-kuznyechik 1	: kuznyechik-kexp15

id-tc26 2 		: id-tc26-constants

id-tc26-constants 1	: id-tc26-sign-constants
id-tc26-sign-constants 1: id-tc26-gost-3410-2012-256-constants
id-tc26-gost-3410-2012-256-constants 1	: id-tc26-gost-3410-2012-256-paramSetA: GOST R 34.10-2012 (256 bit) ParamSet A
id-tc26-gost-3410-2012-256-constants 2	: id-tc26-gost-3410-2012-256-paramSetB: GOST R 34.10-2012 (256 bit) ParamSet B
id-tc26-gost-3410-2012-256-constants 3	: id-tc26-gost-3410-2012-256-paramSetC: GOST R 34.10-2012 (256 bit) ParamSet C
id-tc26-gost-3410-2012-256-constants 4	: id-tc26-gost-3410-2012-256-paramSetD: GOST R 34.10-2012 (256 bit) ParamSet D
id-tc26-sign-constants 2: id-tc26-gost-3410-2012-512-constants
id-tc26-gost-3410-2012-512-constants 0	: id-tc26-gost-3410-2012-512-paramSetTest: GOST R 34.10-2012 (512 bit) testing parameter set
id-tc26-gost-3410-2012-512-constants 1	: id-tc26-gost-3410-2012-512-paramSetA: GOST R 34.10-2012 (512 bit) ParamSet A
id-tc26-gost-3410-2012-512-constants 2	: id-tc26-gost-3410-2012-512-paramSetB: GOST R 34.10-2012 (512 bit) ParamSet B
id-tc26-gost-3410-2012-512-constants 3	: id-tc26-gost-3410-2012-512-paramSetC: GOST R 34.10-2012 (512 bit) ParamSet C

id-tc26-constants 2     : id-tc26-digest-constants
id-tc26-constants 5     : id-tc26-cipher-constants
id-tc26-cipher-constants 1	: id-tc26-gost-28147-constants
id-tc26-gost-28147-constants 1	: id-tc26-gost-28147-param-Z : GOST 28147-89 TC26 parameter set

member-body 643 3 131 1 1	: INN	: INN
member-body 643 100 1		: OGRN	: OGRN
member-body 643 100 3		: SNILS	: SNILS
member-body 643 100 111	: subjectSignTool	: Signing Tool of Subject
member-body 643 100 112	: issuerSignTool	: Signing Tool of Issuer

#GOST R34.13-2015 Grasshopper "Kuznechik"
			: kuznyechik-ecb
			: kuznyechik-ctr
			: kuznyechik-ofb
			: kuznyechik-cbc
			: kuznyechik-cfb
			: kuznyechik-mac

#GOST R34.13-2015 Magma
			: magma-ecb
			: magma-ctr
			: magma-ofb
			: magma-cbc
			: magma-cfb
			: magma-mac

# Definitions for Camellia cipher - CBC MODE

1 2 392 200011 61 1 1 1 2 : CAMELLIA-128-CBC		: camellia-128-cbc
1 2 392 200011 61 1 1 1 3 : CAMELLIA-192-CBC		: camellia-192-cbc
1 2 392 200011 61 1 1 1 4 : CAMELLIA-256-CBC		: camellia-256-cbc
1 2 392 200011 61 1 1 3 2 : id-camellia128-wrap
1 2 392 200011 61 1 1 3 3 : id-camellia192-wrap
1 2 392 200011 61 1 1 3 4 : id-camellia256-wrap

# Definitions for Camellia cipher - ECB, CFB, OFB MODE

!Alias ntt-ds 0 3 4401 5
!Alias camellia ntt-ds 3 1 9

camellia 1		: CAMELLIA-128-ECB		: camellia-128-ecb
!Cname camellia-128-ofb128
camellia 3		: CAMELLIA-128-OFB		: camellia-128-ofb
!Cname camellia-128-cfb128
camellia 4		: CAMELLIA-128-CFB		: camellia-128-cfb
camellia 6		: CAMELLIA-128-GCM		: camellia-128-gcm
camellia 7		: CAMELLIA-128-CCM		: camellia-128-ccm
camellia 9		: CAMELLIA-128-CTR		: camellia-128-ctr
camellia 10		: CAMELLIA-128-CMAC		: camellia-128-cmac

camellia 21		: CAMELLIA-192-ECB		: camellia-192-ecb
!Cname camellia-192-ofb128
camellia 23		: CAMELLIA-192-OFB		: camellia-192-ofb
!Cname camellia-192-cfb128
camellia 24		: CAMELLIA-192-CFB		: camellia-192-cfb
camellia 26		: CAMELLIA-192-GCM		: camellia-192-gcm
camellia 27		: CAMELLIA-192-CCM		: camellia-192-ccm
camellia 29		: CAMELLIA-192-CTR		: camellia-192-ctr
camellia 30		: CAMELLIA-192-CMAC		: camellia-192-cmac

camellia 41		: CAMELLIA-256-ECB		: camellia-256-ecb
!Cname camellia-256-ofb128
camellia 43		: CAMELLIA-256-OFB		: camellia-256-ofb
!Cname camellia-256-cfb128
camellia 44		: CAMELLIA-256-CFB		: camellia-256-cfb
camellia 46		: CAMELLIA-256-GCM		: camellia-256-gcm
camellia 47		: CAMELLIA-256-CCM		: camellia-256-ccm
camellia 49		: CAMELLIA-256-CTR		: camellia-256-ctr
camellia 50		: CAMELLIA-256-CMAC		: camellia-256-cmac

# There are no OIDs for these modes...

			: CAMELLIA-128-CFB1		: camellia-128-cfb1
			: CAMELLIA-192-CFB1		: camellia-192-cfb1
			: CAMELLIA-256-CFB1		: camellia-256-cfb1
			: CAMELLIA-128-CFB8		: camellia-128-cfb8
			: CAMELLIA-192-CFB8		: camellia-192-cfb8
			: CAMELLIA-256-CFB8		: camellia-256-cfb8

# Definitions for ARIA cipher

!Alias aria 1 2 410 200046 1 1
aria 1                  : ARIA-128-ECB                  : aria-128-ecb
aria 2                  : ARIA-128-CBC                  : aria-128-cbc
!Cname aria-128-cfb128
aria 3                  : ARIA-128-CFB                  : aria-128-cfb
!Cname aria-128-ofb128
aria 4                  : ARIA-128-OFB                  : aria-128-ofb
aria 5			: ARIA-128-CTR                  : aria-128-ctr

aria 6                  : ARIA-192-ECB                  : aria-192-ecb
aria 7                  : ARIA-192-CBC                  : aria-192-cbc
!Cname aria-192-cfb128
aria 8                  : ARIA-192-CFB                  : aria-192-cfb
!Cname aria-192-ofb128
aria 9                  : ARIA-192-OFB                  : aria-192-ofb
aria 10                 : ARIA-192-CTR                  : aria-192-ctr

aria 11                 : ARIA-256-ECB                  : aria-256-ecb
aria 12                 : ARIA-256-CBC                  : aria-256-cbc
!Cname aria-256-cfb128
aria 13                 : ARIA-256-CFB                  : aria-256-cfb
!Cname aria-256-ofb128
aria 14                 : ARIA-256-OFB                  : aria-256-ofb
aria 15                 : ARIA-256-CTR                  : aria-256-ctr

# There are no OIDs for these ARIA modes...
                        : ARIA-128-CFB1                 : aria-128-cfb1
                        : ARIA-192-CFB1                 : aria-192-cfb1
                        : ARIA-256-CFB1                 : aria-256-cfb1
                        : ARIA-128-CFB8                 : aria-128-cfb8
                        : ARIA-192-CFB8                 : aria-192-cfb8
                        : ARIA-256-CFB8                 : aria-256-cfb8

aria 37                 : ARIA-128-CCM                  : aria-128-ccm
aria 38                 : ARIA-192-CCM                  : aria-192-ccm
aria 39                 : ARIA-256-CCM                  : aria-256-ccm
aria 34                 : ARIA-128-GCM                  : aria-128-gcm
aria 35                 : ARIA-192-GCM                  : aria-192-gcm
aria 36                 : ARIA-256-GCM                  : aria-256-gcm

# Definitions for SEED cipher - ECB, CBC, OFB mode

member-body 410 200004  : KISA          : kisa
kisa 1 3                : SEED-ECB      : seed-ecb
kisa 1 4                : SEED-CBC      : seed-cbc
!Cname seed-cfb128
kisa 1 5                : SEED-CFB      : seed-cfb
!Cname seed-ofb128
kisa 1 6                : SEED-OFB      : seed-ofb


# Definitions for SM4 cipher

sm-scheme 104 1         : SM4-ECB             : sm4-ecb
sm-scheme 104 2         : SM4-CBC             : sm4-cbc
!Cname sm4-ofb128
sm-scheme 104 3         : SM4-OFB             : sm4-ofb
!Cname sm4-cfb128
sm-scheme 104 4         : SM4-CFB             : sm4-cfb
sm-scheme 104 5         : SM4-CFB1            : sm4-cfb1
sm-scheme 104 6         : SM4-CFB8            : sm4-cfb8
sm-scheme 104 7         : SM4-CTR             : sm4-ctr

# There is no OID that just denotes "HMAC" oddly enough...

			: HMAC				: hmac
# Nor CMAC either
			: CMAC				: cmac

# Synthetic composite ciphersuites
			: RC4-HMAC-MD5			: rc4-hmac-md5
			: AES-128-CBC-HMAC-SHA1		: aes-128-cbc-hmac-sha1
			: AES-192-CBC-HMAC-SHA1		: aes-192-cbc-hmac-sha1
			: AES-256-CBC-HMAC-SHA1		: aes-256-cbc-hmac-sha1
			: AES-128-CBC-HMAC-SHA256	: aes-128-cbc-hmac-sha256
			: AES-192-CBC-HMAC-SHA256	: aes-192-cbc-hmac-sha256
			: AES-256-CBC-HMAC-SHA256	: aes-256-cbc-hmac-sha256
			: ChaCha20-Poly1305		: chacha20-poly1305
			: ChaCha20			: chacha20

ISO-US 10046 2 1	: dhpublicnumber		: X9.42 DH

# RFC 5639 curve OIDs (see http://www.ietf.org/rfc/rfc5639.txt)
# versionOne OBJECT IDENTIFIER ::= {
# iso(1) identified-organization(3) teletrust(36) algorithm(3)
# signature-algorithm(3) ecSign(2) ecStdCurvesAndGeneration(8)
# ellipticCurve(1) 1 }
1 3 36 3 3 2 8 1 1 1 : brainpoolP160r1
1 3 36 3 3 2 8 1 1 2 : brainpoolP160t1
1 3 36 3 3 2 8 1 1 3 : brainpoolP192r1
1 3 36 3 3 2 8 1 1 4 : brainpoolP192t1
1 3 36 3 3 2 8 1 1 5 : brainpoolP224r1
1 3 36 3 3 2 8 1 1 6 : brainpoolP224t1
1 3 36 3 3 2 8 1 1 7 : brainpoolP256r1
1 3 36 3 3 2 8 1 1 8 : brainpoolP256t1
1 3 36 3 3 2 8 1 1 9 : brainpoolP320r1
1 3 36 3 3 2 8 1 1 10 : brainpoolP320t1
1 3 36 3 3 2 8 1 1 11 : brainpoolP384r1
1 3 36 3 3 2 8 1 1 12 : brainpoolP384t1
1 3 36 3 3 2 8 1 1 13 : brainpoolP512r1
1 3 36 3 3 2 8 1 1 14 : brainpoolP512t1

# ECDH schemes from RFC5753
!Alias x9-63-scheme 1 3 133 16 840 63 0
!Alias secg-scheme certicom-arc 1

x9-63-scheme 2   : dhSinglePass-stdDH-sha1kdf-scheme
secg-scheme 11 0 : dhSinglePass-stdDH-sha224kdf-scheme
secg-scheme 11 1 : dhSinglePass-stdDH-sha256kdf-scheme
secg-scheme 11 2 : dhSinglePass-stdDH-sha384kdf-scheme
secg-scheme 11 3 : dhSinglePass-stdDH-sha512kdf-scheme

x9-63-scheme 3   : dhSinglePass-cofactorDH-sha1kdf-scheme
secg-scheme 14 0 : dhSinglePass-cofactorDH-sha224kdf-scheme
secg-scheme 14 1 : dhSinglePass-cofactorDH-sha256kdf-scheme
secg-scheme 14 2 : dhSinglePass-cofactorDH-sha384kdf-scheme
secg-scheme 14 3 : dhSinglePass-cofactorDH-sha512kdf-scheme
# NIDs for use with lookup tables.
                 : dh-std-kdf
                 : dh-cofactor-kdf

# RFC 6962 Extension OIDs (see http://www.ietf.org/rfc/rfc6962.txt)
1 3 6 1 4 1 11129 2 4 2	: ct_precert_scts		: CT Precertificate SCTs
1 3 6 1 4 1 11129 2 4 3	: ct_precert_poison		: CT Precertificate Poison
1 3 6 1 4 1 11129 2 4 4	: ct_precert_signer		: CT Precertificate Signer
1 3 6 1 4 1 11129 2 4 5	: ct_cert_scts			: CT Certificate SCTs

# CABForum EV SSL Certificate Guidelines
# (see https://cabforum.org/extended-validation/)
# OIDs for Subject Jurisdiction of Incorporation or Registration
1 3 6 1 4 1 311 60 2 1 1	: jurisdictionL		: jurisdictionLocalityName
1 3 6 1 4 1 311 60 2 1 2	: jurisdictionST	: jurisdictionStateOrProvinceName
1 3 6 1 4 1 311 60 2 1 3	: jurisdictionC		: jurisdictionCountryName

# SCRYPT algorithm
!Cname id-scrypt
1 3 6 1 4 1 11591 4 11		: id-scrypt         : scrypt

# NID for TLS1 PRF
                            : TLS1-PRF          : tls1-prf

# NID for HKDF
                            : HKDF              : hkdf

# NID for SSHKDF
                            : SSHKDF            : sshkdf

# NID for SSKDF
                            : SSKDF              : sskdf
# NID for X942KDF
                            : X942KDF            : x942kdf

# NID for X963-2001 KDF
                            : X963KDF            : x963kdf

# RFC 4556
1 3 6 1 5 2 3 : id-pkinit
id-pkinit 4                     : pkInitClientAuth      : PKINIT Client Auth
id-pkinit 5                     : pkInitKDC             : Signing KDC Response

# From RFC8410
1 3 101 110 : X25519
1 3 101 111 : X448
1 3 101 112 : ED25519
1 3 101 113 : ED448


# NIDs for cipher key exchange
                            : KxRSA        : kx-rsa
                            : KxECDHE      : kx-ecdhe
                            : KxDHE        : kx-dhe
                            : KxECDHE-PSK  : kx-ecdhe-psk
                            : KxDHE-PSK    : kx-dhe-psk
                            : KxRSA_PSK    : kx-rsa-psk
                            : KxPSK        : kx-psk
                            : KxSRP        : kx-srp
                            : KxGOST       : kx-gost
                            : KxGOST18     : kx-gost18
                            : KxANY        : kx-any

# NIDs for cipher authentication
                            : AuthRSA      : auth-rsa
                            : AuthECDSA    : auth-ecdsa
                            : AuthPSK      : auth-psk
                            : AuthDSS      : auth-dss
                            : AuthGOST01   : auth-gost01
                            : AuthGOST12   : auth-gost12
                            : AuthSRP      : auth-srp
                            : AuthNULL     : auth-null
                            : AuthANY      : auth-any
# NID for Poly1305
                            : Poly1305     : poly1305
# NID for SipHash
                            : SipHash      : siphash
# NIDs for RFC7919 DH parameters
                            : ffdhe2048
                            : ffdhe3072
                            : ffdhe4096
                            : ffdhe6144
                            : ffdhe8192
# NIDs for RFC3526 DH parameters
                            : modp_1536
                            : modp_2048
                            : modp_3072
                            : modp_4096
                            : modp_6144
                            : modp_8192

# OIDs for DSTU-4145/DSTU-7564 (http://zakon2.rada.gov.ua/laws/show/z0423-17)

# DSTU OIDs
member-body 804   : ISO-UA
ISO-UA 2 1 1 1    : ua-pki
ua-pki 1 1 1      : dstu28147         : DSTU Gost 28147-2009
dstu28147 2       : dstu28147-ofb     : DSTU Gost 28147-2009 OFB mode
dstu28147 3       : dstu28147-cfb     : DSTU Gost 28147-2009 CFB mode
dstu28147 5       : dstu28147-wrap    : DSTU Gost 28147-2009 key wrap

ua-pki 1 1 2      : hmacWithDstu34311 : HMAC DSTU Gost 34311-95
ua-pki 1 2 1      : dstu34311         : DSTU Gost 34311-95

ua-pki 1 3 1 1    : dstu4145le        : DSTU 4145-2002 little endian
dstu4145le 1 1    : dstu4145be        : DSTU 4145-2002 big endian

# 1.2.804. 2.1.1.1 1.3.1.1  .2.6
#     UA    ua-pki  4145 le
# DSTU named curves
dstu4145le 2 0 : uacurve0 : DSTU curve 0
dstu4145le 2 1 : uacurve1 : DSTU curve 1
dstu4145le 2 2 : uacurve2 : DSTU curve 2
dstu4145le 2 3 : uacurve3 : DSTU curve 3
dstu4145le 2 4 : uacurve4 : DSTU curve 4
dstu4145le 2 5 : uacurve5 : DSTU curve 5
dstu4145le 2 6 : uacurve6 : DSTU curve 6
dstu4145le 2 7 : uacurve7 : DSTU curve 7
dstu4145le 2 8 : uacurve8 : DSTU curve 8
dstu4145le 2 9 : uacurve9 : DSTU curve 9
# NID for AES-SIV
                            : AES-128-SIV  : aes-128-siv
                            : AES-192-SIV  : aes-192-siv
                            : AES-256-SIV  : aes-256-siv
`;

// From https://cabforum.org/resources/object-registry/
let caBrowserOIDs = 
`
international-organizations 140 : ca-browser-forum
ca-browser-forum 1 : certificate-policies
certificate-policies 1 : extended-validation
certificate-policies 2 : baseline-requirements
baseline-requirements 1 : domain-validated
baseline-requirements 2 : organization-validated
baseline-requirements 3: individual-validated
certificate-policies 3 : extended-validation-codesigning
certificate-policies 4 : codesigning-requirements
certificate-policies codesigning-requirements 1 : codesigning
certificate-policies codesigning-requirements 2 : timestamping
# ...more content omitted
`;



let oidToName = new Map();
let nameToOID = new Map();
let oidToShortName = new Map();


function getOid([root, ...extra]) {
    if (!isNaN(root)) return [root, ...extra];
    if (nameToOID.has(root)) return [...nameToOID.get(root), ...extra];
    // console.log(root);
    return null;
}


function importData(objects) {
    let cname = null;

    let moduleName = null;

    for (let line of objects.split("\n")) {

        if (line.startsWith("!")) {
            let [instruction, name, ...values] = line.split(" ");
            if (instruction == "!Cname") {
                cname = name;
            }
            if (instruction == "!Alias") {
                let oid = getOid(values);
                if (!oid) continue;
                nameToOID.set(moduleName ? `${moduleName}_${name}` : name, oid);
            }
            if (instruction == "!module") {
                moduleName = name;
            }
            if (instruction == "!global") {
                moduleName = null;
            }
        } else if (!line.startsWith("#")) {
            let [key, shortName, longName] = line.split(":").map(component => component.trim());
            if (shortName || longName) {
                let oidParts = getOid(key.split(" "));
                if (!oidParts) continue;
                nameToOID.set(moduleName ? `${moduleName}_${shortName}` : shortName, oidParts);
                nameToOID.set(moduleName ? `${moduleName}_${longName}` : longName, oidParts);
                if (cname) nameToOID.set(cname, oidParts);
                oidToName.set(oidParts.join("."), longName || shortName);
                oidToShortName.set(oidParts.join("."), shortName || longName);
                cname = null;
            }
        }
    }
}

importData(openSSLOIDs);

importData(caBrowserOIDs);

export default {
    toName: oid => oidToName.get(oid),
    toShortName: oid => oidToShortName.get(oid),
    toOID: name => nameToOID.get(name)
};
