// This Worker demonstrates some of the advanced customizations you can make to the AWS Cognito hosted UI using Cloudflare Workers and the HTMLRewriter API.
export default {
    async fetch(request: Request, env: any): Promise<Response> {
        let res = await fetch(request);
        const contentType = res.headers.get("Content-Type") || "";

        // If the response is HTML, it can be transformed with
        // HTMLRewriter -- otherwise, it should pass through.
        // Only rewrite GET requests.
        if (request.method !== 'GET' || !contentType.startsWith("text/html")) {
            return res;
        }

        try {
            let newRes = new HTMLRewriter()
                // `.on` attaches the element handler and this allows you to match on element/attributes or to use the specific methods per the API
                .on('head', {
                    element(element) {
                        // In this case, you are using `append` to add new links and styles to the `head` element
                        element.append(`<link rel="icon" href="https://www.santiagogarza.co/wp-content/uploads/2020/04/cropped-sg-favicon-1-32x32.png" sizes="32x32">`, { html: true });
                        element.append(`<link rel="icon" href="https://www.santiagogarza.co/wp-content/uploads/2020/04/cropped-sg-favicon-1-192x192.png" sizes="192x192">`, { html: true });
                        element.append(`<style>
                            .submitButton-customizable:active,
                            .submitButton-customizable:focus,
                            .submitButton-customizable:visited {
                                color: #fff;
                                border-color: transparent !important;
                                background-color: #bd0460 !important;
                            }
                            body {
                                background-color: #EAEBED !important;
                            }
                        </style>`, { html: true });
                    }
                })
                // Customize Page Title.
                .on('title', {
                    element(element) {
                        // In this case, you are using `setInnerContent` to modify the title
                        element.setInnerContent(`SSO Sign In - Santiagogarza.co`, { html: true });
                    }
                })
                // Add a link after the form.
                .on('form', {
                    element(element) {
                        // In this case, you are using `after` to add a link after the title
                        element.after(`<div style="text-align:center;"><a href="https://www.santiagogarza.co/"> ← Go to santiagogarza.co</a></div>`, { html: true });

                    }
                })
                .transform(res);
            return newRes;
        } catch (error) {
            console.error(error);
            return res;
        }
    }
};
