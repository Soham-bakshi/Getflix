$protocol = "https"
$host = "github.com"
$username = "Soham-bakshi"

git credential-manager-core erase << EOF
protocol=$protocol
host=$host
username=$username
EOF