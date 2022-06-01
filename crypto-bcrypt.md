# bcrypt info


- [genSalt](#gensalt)
- [hashSync](#hashsync)
- [compareSync](#comparesync)
- [node implementation](#node-implementation)
- [sources](#sources)

## genSalt

creates a salt on N rounds

- genSaltSync(rounds = 10, minor = 'b')
  - rounds: [OPTIONAL] cost of processing the data.
  - minor: [OPTIONAL] minor version of bcrypt to use.

The rounds and minor are tacked onto a hashed password as
    -`2$<minor>$<rounds>$`
    - a 128-bit salt (Radix-64 encoded as 22 characters), N9qo8uLOickgx2ZMRZoMye


## hashSync

encrypts the string using blowfish with including salt, with salt stored in the encrypted password

- hashSync(data, salt)
    - data - [REQUIRED] - the data to be encrypted
    - salt - [REQUIRED] - the salt to be used to hash the password. if specified as a number then a salt will be generated with the specified number of rounds and used


- 84 bits of the resulting hash value (Radix-64 encoded as 31 characters).The Radix-64 encoding uses the unix/crypt alphabet, and is not 'standard' Base-64. The cost parameter specifies a key expansion iteration count as a power of two


## compareSync

- compareSync(data, encrypted)
  - data - [REQUIRED] - data to compare.
  - encrypted - [REQUIRED] - data to be compared to.


How does bcrypt know that salt?

```

    The prefix "$2a$" or "$2b$" (or "$2y$") in a hash string in a shadow password file indicates that hash string is a bcrypt hash in modular crypt format. The rest of the hash string includes the cost parameter, a 128-bit salt (Radix-64 encoded as 22 characters), and 184 bits of the resulting hash value (Radix-64 encoded as 31 characters).The Radix-64 encoding uses the unix/crypt alphabet, and is not 'standard' Base-64. The cost parameter specifies a key expansion iteration count as a power of two, which is an input to the crypt algorithm.

    For example, the shadow password record `$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy` specifies a cost parameter of 10, indicating 2^10 key expansion rounds. The salt is N9qo8uLOickgx2ZMRZoMye and the resulting hash is IjZAgcfl7p92ldGxad68LJZdL17lhWy. Per standard practice, the user's password itself is not stored.

```

`$2<a/b/x/y>$[cost]$[22 character salt][31 character hash]`
Where:
- `$2a$`: The hash algorithm identifier (bcrypt)
- `12`: Input cost (2^12 i.e. 4096 rounds)
- `R9h/cIPz0gi.URNNX3kh2O`: A radix-64 encoding of the input salt
- `PST9/PgBkqquzi.Ss7KIUgO2t0jWMUW`: A radix-64 encoding of the first 23 bytes of the computed 24 byte hash
    -  radix-64 encoding in bcrypt uses the table `./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`, which is different than RFC 4648 Base64 encoding


Be sure to use `crypto.timingSafeEqual` instead of `===` when comparing password hashes

`$2a$10$` `DJ/.ALc9Tc3Eh17FoQpz9` `uaN4YmPxwj4DiO6fCYK2J2tpYHRD7Vae`


## node implementation

The difference really is the algorithm and storage of the salt in its own column

```js
// Create
const numBytes = 16;
const rounds = 64;
const iterations = 1000;
const cipher = 'sha512';
salt = crypto.randomBytes(numBytes).toString('hex');
hash = crypto.pbkdf2Sync(password, salt, iterations, rounds, cipher).toString(`hex`);
```

```js
// validate
const rounds = 64;
const iterations = 1000;
const cipher = 'sha512';
salt = read from db
passwordHash = read from db;
_hash = crypto.pbkdf2Sync(passwordHash, salt, iterations, rounds, cipher); // returns buffer
return crypto.timingSafeEqual(_hash, Buffer.from(passwordHash, 'hex'));
```


## sources

- https://stackoverflow.com/questions/61986478/how-bcrypt-js-compare-method-knows-the-number-of-salting-rounds
- https://en.wikipedia.org/wiki/Bcrypt
- https://www.geeksforgeeks.org/node-js-password-hashing-crypto-module/
