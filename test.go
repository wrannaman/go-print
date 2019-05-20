package test

import (
	"fmt"
	"os"
	"strings"
)

// Configuration ...
type Configuration struct {
	certPath      int
	auth0Domain   string
	mixpanelToken string
}

func main() {
	env := strings.ToLower(os.Getenv("ENV"))
	fmt.Printf("env %v", env)
}
