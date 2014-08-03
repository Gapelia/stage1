alpha branch
======

# Tomcat Configuration
add this to your ```catalina.sh``` (Debian/Ubuntu: /usr/share/tomcat7/bin)
```bash
JAVA_OPTS="$JAVA_OPTS -DgapeliaMode=local -DgapeliaDummy=true"
```

# Amazon S3
## Bucket Policy
```json
{
	"Version": "2008-10-17",
	"Id": "Policy1380877762691",
	"Statement": [
		{
			"Sid": "Stmt1380877761162",
			"Effect": "Allow",
			"Principal": {
				"AWS": "*"
			},
			"Action": "s3:GetObject",
			"Resource": "arn:aws:s3:::folio_filepicker/*"
		}
	]
}
```

## CORS Configuration
```xml
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>http://folio.is</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>Content-*</AllowedHeader>
        <AllowedHeader>Host</AllowedHeader>
    </CORSRule>
    <CORSRule>
        <AllowedOrigin>http://*.folio.is</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>Content-*</AllowedHeader>
        <AllowedHeader>Host</AllowedHeader>
    </CORSRule>
    <CORSRule>
        <AllowedOrigin>https://folio.is</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>Content-*</AllowedHeader>
        <AllowedHeader>Host</AllowedHeader>
    </CORSRule>
    <CORSRule>
        <AllowedOrigin>https://*.folio.is</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>Content-*</AllowedHeader>
        <AllowedHeader>Host</AllowedHeader>
    </CORSRule>
    <CORSRule>
        <AllowedOrigin>http://localhost:8080</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>Content-*</AllowedHeader>
        <AllowedHeader>Host</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```
