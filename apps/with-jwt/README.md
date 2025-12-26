# with-jwt - JWT Demo App

A Next.js application demonstrating JWT (JSON Web Token) operations using the `jose` library for secure token generation and verification.

## Features

### 🔐 JWT Operations
- **Token Generation** - Create signed JWT tokens with custom claims
- **Token Verification** - Validate and decode JWT tokens
- **Secure Signing** - Cryptographic signing using secret keys
- **Token Expiration** - Built-in expiration handling

## Project Structure

```
apps/with-jwt/
├── app/
│   ├── layout.tsx           # Root layout with theme provider
│   ├── page.tsx             # Home page
│   └── styles.css           # Global styles
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies and scripts
├── postcss.config.mjs       # PostCSS configuration
└── tsconfig.json            # TypeScript configuration
```

## Dependencies

- **jose** - JWT implementation for JavaScript (RFC 7519)
- **next** - Next.js framework
- **@repo/design-system** - Shared UI components
- **react** - React library

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm

### Installation

1. Install dependencies from the monorepo root:
   ```bash
   pnpm install
   ```

2. Run the development server:
   ```bash
   cd apps/with-jwt
   pnpm dev
   ```

3. Open [http://localhost:3008](http://localhost:3008)

## JWT Usage Examples

### Generating a JWT Token

```typescript
import { SignJWT } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

const token = await new SignJWT({ userId: "123", email: "user@example.com" })
  .setProtectedHeader({ alg: "HS256" })
  .setIssuedAt()
  .setExpirationTime("2h")
  .sign(secret);
```

### Verifying a JWT Token

```typescript
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

try {
  const { payload } = await jwtVerify(token, secret);
  console.log("Token verified:", payload);
} catch (error) {
  console.error("Token verification failed:", error);
}
```

## Environment Variables

Create a `.env.local` file in the `apps/with-jwt` directory:

```env
# JWT Secret Key (use a strong, random secret in production)
JWT_SECRET=your-super-secret-key-change-in-production
```

**Security Note**: Never commit your JWT secret to version control. Use environment variables and ensure the secret is strong and randomly generated.

## Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Type checking
pnpm typecheck

# Clean build artifacts
pnpm clean
```

## Security Best Practices

1. **Strong Secrets**: Use cryptographically secure random strings for JWT secrets
2. **Token Expiration**: Always set expiration times on tokens
3. **HTTPS Only**: In production, only transmit tokens over HTTPS
4. **Secret Rotation**: Regularly rotate JWT secrets
5. **Server-Side Only**: Never expose JWT secrets to the client

## Related Packages

- `@repo/design-system` - Shared UI components
- `@repo/typescript-config` - TypeScript configuration

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [jose Library Documentation](https://github.com/panva/jose)
- [JWT Best Practices](https://auth0.com/blog/jwt-security-best-practices/)
- [RFC 7519 - JSON Web Token](https://tools.ietf.org/html/rfc7519)

