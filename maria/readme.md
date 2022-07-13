# MariaDB Info


- [Encryption at Rest](#encryption-at-rest)
- [Api for downloads](#api-for-downloads)
- [Installing from CLI](#installing-from-cli)
  - [properties](#properties)
  - [features](#features)
  - [logging](#logging)
  - [examples](#examples)
  - [resources](#resources)
- [JSON](#json)



Determine version: `SELECT @@version`

## Encryption at Rest

[Encryption at rest](./maria-encryption-rest.md)


## Api for downloads

- [Rest Api](https://mariadb.org/downloads-rest-api/)

- url: `https://downloads.mariadb.org/rest-api/mariadb`
- release_status: 'RC', 'Stable', 'Old Stable'
```json
{
     "major_releases": [
        {
            "release_id": "10.8",
            "release_name": "MariaDB Server 10.8",
            "release_status": "RC"
        }
     ]
}
```

`https://downloads.mariadb.org/rest-api/mariadb/<version>`
```json
{
    "release_data": {
        "10.4.24": {
            "release_id": "10.4.24",
            "release_name": "MariaDB Server 10.4.24",
            "date_of_release": "2022-02-14",
            "release_notes_url": "",
            "change_log": "",
             "files": [
                 {
                    "file_id": 12883,
                    "file_name": "mariadb-10.4.24-winx64.msi",
                    "package_type": "MSI Package",
                    "os": "Windows",
                    "cpu": "x86_64",
                    "checksum": {
                        "md5sum": "39d96412f5027c3e34d059f4619d4da0",
                        "sha1sum": "a04af34947742f80790654d93804b0b348a66688",
                        "sha256sum": "7abe3857ca3c8e4630afc719f5968a5c7976b1f31d994ec7a09bc2cd5b4af740",
                        "sha512sum": "644bb54bea4ed8c1e304ff5f540a473447abbc8ea863e635af771a369e78877b84fe489e719fe4e5589757cec121859d46e311fe4b1f291c1281289133a006b8"
                    },
                    "signature": "-----BEGIN PGP SIGNATURE-----\n\niF0EABECAB0WIQQZk2nlQEvV/H0v5DvLywgqG7lD2wUCYgb3DAAKCRDLywgqG7lD\n21IbAKChtzEaFEX+fYpa4eLFQDxDKG8p/wCeIb49stiQ1dTVFf94fTTuGD4IS4c=\n=sjHr\n-----END PGP SIGNATURE-----\n",
                    "checksum_url": "http://downloads.mariadb.org/rest-api/mariadb/10.4.24/mariadb-10.4.24-winx64.msi/checksum/",
                    "signature_url": "http://downloads.mariadb.org/rest-api/mariadb/10.4.24/mariadb-10.4.24-winx64.msi/signature/",
                    "file_download_url": "http://downloads.mariadb.org/rest-api/mariadb/10.4.24/mariadb-10.4.24-winx64.msi"
                }
             ]
        }
    }
}
```



## Installing from CLI


### properties

| Property name         |            Default value            | Description                                                                                   |
| :-------------------- | :---------------------------------: | :-------------------------------------------------------------------------------------------- |
| INSTALLDIR            | `%ProgramFiles%\MariaDB <version>\` | Installation root                                                                             |
| PORT                  |                3306                 | --port parameter for the server                                                               |
| ALLOWREMOTEROOTACCESS |                                     | Allow remote access for root user                                                             |
| BUFFERPOOLSIZE        |                RAM/8                | Bufferpoolsize for innodb                                                                     |
| CLEANUPDATA           |                  1                  | Remove the data directory (uninstall only)                                                    |
| DATADIR               |           INSTALLDIR\data           | Location of the data directory                                                                |
| DEFAULTUSER           |                                     | Allow anonymous users                                                                         |
| PASSWORD              |                                     | Password of the root user                                                                     |
| SERVICENAME           |                                     | Name of the Windows service. A service is not created if this value is empty.                 |
| SKIPNETWORKING        |                                     | Skip networking                                                                               |
| STDCONFIG             |                  1                  | Corresponds to "optimize for transactions" in the GUI, default engine innodb, strict sql mode |
| UTF8                  |                                     | if set, adds character-set-server=utf8 to my.ini file (added in MariaDB 5.5.29)               |
| PAGESIZE              |                 16K                 | page size for innodb                                                                          |


### features

| Feature id      | Installed by default? | Description                                     |
| :-------------- | :-------------------: | :---------------------------------------------- |
| DBInstance      |          yes          | Install database instance                       |
| Client          |          yes          | Command line client programs                    |
| MYSQLSERVER     |          yes          | Install server                                  |
| SharedLibraries |          yes          | Install client shared library                   |
| DEVEL           |          yes          | install C/C++ header files and client libraries |
| HeidiSQL        |          yes          | Installs HeidiSQL                               |


### logging

`/l*v path-to-logfile.txt`

### examples

Install default features, database instance as service, non-default datadir and port <br>
`msiexec /i path-to-package.msi SERVICENAME=MySQL DATADIR=C:\mariadb5.2\data PORT=3307 /qn`

To keep the data directory during an uninstall, you will need to pass an additional parameter <br>
`msiexec /i path-to-package.msi SERVICENAME=MySQL ADDLOCAL=DEBUGSYMBOLS REMOVE=DEVEL /qn`

### resources

- [option files](https://mariadb.com/kb/en/configuring-mariadb-with-option-files/)
- [cli installation](https://mariadb.com/kb/en/installing-mariadb-msi-packages-on-windows/#silent-installation)
- [msiexec](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/msiexec)


## JSON

- [Quick start](https://mariadb.com/resources/blog/using-json-in-mariadb/)
- [Sequelize JSON support](https://sequelize.org/docs/v6/other-topics/other-data-types/#json--sqlite--mysql--mariadb-and-postgresql-only-)
- [Prisma JSON support](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields)
