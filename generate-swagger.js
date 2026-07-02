const fs = require('fs');
const path = require('path');

const schemas = [
  'auth', 'client', 'company', 'plan', 'policy', 
  'payment', 'quotation', 'renewal', 'report'
];

const schemaDir = path.join(__dirname, 'server', 'src', 'docs', 'schemas');

schemas.forEach(schema => {
  const cap = schema.charAt(0).toUpperCase() + schema.slice(1);
  const isAuth = schema === 'auth';
  
  const yaml = `
components:
  schemas:
    ${cap}:
      type: object
      properties:
        id:
          type: string
          description: Unique identifier
        createdAt:
          type: string
          format: date-time
      example:
        id: "cuid12345"
        createdAt: "2026-07-02T10:00:00Z"

paths:
  /api/v1/${schema === 'auth' ? 'auth/login' : schema + 's'}:
    ${isAuth ? 'post' : 'get'}:
      summary: ${isAuth ? 'Login User' : 'Get all ' + schema + 's'}
      tags:
        - ${cap}
      security:
        - bearerAuth: []
      responses:
        "200":
          description: Successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                  message:
                    type: string
                  data:
                    type: ${isAuth ? 'object' : 'array'}
        "400":
          description: Validation Error
        "401":
          description: Unauthorized - Authentication Required
        "403":
          description: Forbidden - Required Roles Missing
`;
  fs.writeFileSync(path.join(schemaDir, `${schema}.yaml`), yaml.trim());
});

console.log("YAML schemas created");
