#!/bin/bash 
#
# This script uses a variant of the super useful command by Antonio Feitosa
#   https://serverfault.com/questions/661978/displaying-a-remote-ssl-certificate-details-using-cli-tools
#
# @date 2020-01-22
# @author ika@int2byte.de


# Params
#  $ARG1 hostname (without https://)
if [ $# -eq 0 ]
  then
    echo "No arguments supplied. Please specify a host name."
    exit 1
fi


function get-ssl-info() {

    name=$1

    # This call works with most SSL certificate types
    # output=$(curl -o - -s -v --insecure -ILXGET "https://$1" 2>&1 | sed '/^(\n\r)(\n\r)/d')
    output=$(curl --insecure -v "https://$name" 2>&1 | awk 'BEGIN { cert=0 } /^\* SSL connection/ { cert=1 } /^\*/ { if (cert) print }')
    # echo "output: $output"

    # Output looks like this:
    # [...]
    # * SSL connection using TLS1.2 / ECDHE_RSA_AES_128_GCM_SHA256
    # * 	 server certificate verification SKIPPED
    # * 	 server certificate status verification SKIPPED
    # * 	 common name: dev.func.name (does not match 'func.name')
    # * 	 server certificate expiration date OK
    # * 	 server certificate activation date OK
    # * 	 certificate public key: RSA
    # * 	 certificate version: #3
    # * 	 subject: CN=dev.func.name
    # * 	 start date: Sat, 07 Dec 2019 16:39:04 GMT
    # * 	 expire date: Fri, 06 Mar 2020 16:39:04 GMT
    # * 	 issuer: C=US,O=Let's Encrypt,CN=Let's Encrypt Authority X3
    # * 	 compression: NULL
    # * ALPN, server accepted to use http/1.1
    # * Connection #0 to host func.name left intact
    # [...]

    # -Po (P=Perl regex matching, o=print non-empty matching parts)
    # \K set the catch marker
    SSL_PROTOCOL=$(echo "$output" | grep -Po '\\*(\s)*SSL connection using \K[^\\/\n\r]*')
    SSL_COMMON_NAME=$(echo "$output" | grep -Po '\\*(\s)*common name: \K[^\s\(\n\r]*')
    SSL_PUBLIC_KEY_TYPE=$(echo "$output" | grep -Po '\\*(\s)*certificate public key: \K[^\s\n\r]*')
    SSL_CERT_VERSION=$(echo "$output" | grep -Po '\\*(\s)*certificate version: \K[^\s\n\r]*')
    SSL_START_DATE=$(echo "$output" | grep -Po '\\*(\s)*start date: \K[^\n\r]*')
    SSL_EXPIRE_DATE=$(echo "$output" | grep -Po '\\*(\s)*expire date: \K[^\n\r]*')
    SSL_ISSUER_COUNTRY=$(echo "$output" | grep -Po '\\*(\s)*issuer: ((^C=)|[^\n\r])*(\s*)C=\K[^,\n\r]*')
    SSL_ISSUER_COMMON_NAME=$(echo "$output" | grep -Po '\\*(\s)*issuer: ((^CN=)|[^\n\r])*(\s*)CN=\K[^,\n\r]*')
    SSL_ISSUER_ORGANISATIONAL_UNIT=$(echo "$output" | grep -Po '\\*(\s)*issuer: ((^OU=)|[^\n\r])*(\s*)OU=\K[^,\n\r]*')
    SSL_ISSUER_ORGANISATION=$(echo "$output" | grep -Po '\\*(\s)*issuer: ((^O=)|[^\n\r])*(\s*)O=\K[^,\n\r]*')
    SSL_ISSUER_LOCALITY=$(echo "$output" | grep -Po '\\*(\s)*issuer: ((^L=)|[^\n\r])*(\s*)L=\K[^,\n\r]*')
    SSL_ISSUER_STATE=$(echo "$output" | grep -Po '\\*(\s)*issuer: ((^S=)|[^\n\r])*(\s*)S=\K[^,\n\r]*')
    SSL_NAME_MATCH=$(if [ "$name" = "$SSL_COMMON_NAME" ]; then echo "true"; else echo "false"; fi)
    
    echo "SSL_PROTOCOL=$SSL_PROTOCOL"
    echo "SSL_COMMON_NAME=$SSL_COMMON_NAME"
    echo "SSL_PUBLIC_KEY_TYPE=$SSL_PUBLIC_KEY_TYPE"
    echo "SSL_CERT_VERSION=$SSL_CERT_VERSION"
    echo "SSL_START_DATE=$SSL_START_DATE"
    echo "SSL_EXPIRE_DATE=$SSL_EXPIRE_DATE"
    echo "SSL_ISSUE_COUNTRY=$SSL_ISSUER_COUNTRY"
    echo "SSL_ISSUER_ORGANISATION=$SSL_ISSUER_ORGANISATION"
    echo "SSL_ISSUER_ORGANISATIONAL_UNIT=$SSL_ISSUER_ORGANISATIONAL_UNIT"
    echo "SSL_ISSUER_COMMON_NAME=$SSL_ISSUER_COMMON_NAME"
    echo "SSL_ISSUER_LOCALITY=$SSL_ISSUER_LOCALITY"
    echo "SSL_ISSUER_STATE=$SSL_ISSUER_STATE"
    echo "SSL_NAME_MATCH=$SSL_NAME_MATCH"

    # Write the stuff to a JSON file or database
    echo "{
  \"name\" : \"$name\",
  \"SSL_PROTOCOL\" : \"$SSL_PROTOCOL\", 
  \"SSL_COMMON_NAME\" : \"$SSL_COMMON_NAME\", 
  \"SSL_PUBLIC_KEY_TYPE\" : \"$SSL_PUBLIC_KEY_TYPE\", 
  \"SSL_CERT_VERSION\" : \"$SSL_CERT_VERSION\", 
  \"SSL_START_DATE\" : \"$SSL_START_DATE\", 
  \"SSL_EXPIRE_DATE\" : \"$SSL_EXPIRE_DATE\", 
  \"SSL_ISSUE_COUNTRY\" : \"$SSL_ISSUER_COUNTRY\", 
  \"SSL_ISSUER_ORGANISATION\" : \"$SSL_ISSUER_ORGANISATION\", 
  \"SSL_ISSUER_ORGANISATIONAL_UNIT\" : \"$SSL_ISSUER_ORGANISATIONAL_UNIT\", 
  \"SSL_ISSUER_COMMON_NAME\" : \"$SSL_ISSUER_COMMON_NAME\", 
  \"SSL_ISSUER_LOCALITY\" : \"$SSL_ISSUER_LOCALITY\", 
  \"SSL_ISSUER_STATE\" : \"$SSL_ISSUER_STATE\", 
  \"SSL_NAME_MATCH\" : $SSL_NAME_MATCH
}" > "../data/$name.json"
}

get-ssl-info $1


