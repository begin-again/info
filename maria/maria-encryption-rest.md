# MariaDB Encryption at Rest

- [status](#status)
- [decrypt](#decrypt)
- [backups](#backups)
  - [Restore](#restore)
  - [ini](#ini)

Supports encryption via plugins. File key management [plugin](https://mariadb.com/kb/en/file-key-management-encryption-plugin/) is bundled. Basically the plugin will read key(s) from a text file which should also be encrypted. (<id number>;<openssl rand -hex 32>)

```
1;770A8A65DA156D24EE2A093277530142
```

-  what is the impact on existing data?
   -  no impact
-  see also [Enabling InnoDB Encryption](https://mariadb.com/kb/en/innodb-enabling-encryption/)

To toggle encryption for testing times I used `SET GLOBAL innodb_encrypt_tables = OFF;`

status of tables during encrypt/decrypt
```sql
SELECT st.SPACE, st.NAME, te.ENCRYPTION_SCHEME, te.ROTATING_OR_FLUSHING
FROM information_schema.INNODB_TABLESPACES_ENCRYPTION te
JOIN information_schema.INNODB_SYS_TABLES st
   ON te.SPACE = st.SPACE;
```

ENCRYPTION_SCHEME = the key number, 0 would be non-encrypted

![image](https://user-images.githubusercontent.com/11179873/154510412-2f8a5585-2547-4232-92bf-31fdd0eabc78.png)


## status

The encryption operation can be monitored from INFORMATION_SCHEMA.INNODB_TABLESPACES_ENCRYPTION table. In the following example, we query name of tablespace, current page under key rotation and maximum page in the tablespace for those tables that are not yet encrypted

```sql
select name, KEY_ROTATION_PAGE_NUMBER, KEY_ROTATION_MAX_PAGE_NUMBER
from information_schema.innodb_tablespaces_encryption
where min_key_version = 0 or ROTATING_OR_FLUSHING = 1;
```

Query status of the tables

```sql
select * from information_schema.innodb_tablespaces_encryption;
```

Database encryption is finished when there are no tables in an unencrypted state.

```sql
select * from information_schema.innodb_tablespaces_encryption where min_key_version != 0;
```


__REDO lOG__

the `innodb_encrypt_tables` system variable only encrypts the InnoDB tablespaces.  In order to also encrypt the InnoDB Redo Logs, you also need to set the `innodb_encrypt_logs` system variable.

## decrypt


```sql
SET GLOBAL innodb_encrypt_tables=OFF;
SET GLOBAL innodb_encryption_threads = 4; -- should already be set to a non-zero value
SET GLOBAL innodb_encryption_rotate_key_age = 1;
```

Once set, any InnoDB tablespaces that have the ENCRYPTED table option set to DEFAULT will be decrypted in the background by the InnoDB background encryption threads.


## backups

A MariaDB Server version can often be backed up with most other Mariabackup releases in the same release series. For example, MariaDB 10.2.21 and MariaDB 10.2.22 are both in the MariaDB 10.2 release series, so MariaDB Server from MariaDB 10.2.21 could be backed up by Mariabackup from MariaDB 10.2.22, or vice versa.

However, occasionally, a MariaDB Server or Mariabackup release will include bug fixes that will break compatibility with previous releases. For example, the fix for MDEV-13564 changed the InnoDB redo log format in MariaDB 10.2.19 which broke compatibility with previous releases. To be safest, a MariaDB Server release should generally be backed up with the Mariabackup release that has the same version number.

https://mariadb.com/kb/en/mariabackup-overview/

target-dir: must be empty or non-existent
password: enclosed in single quote to prevent shell expansion

1. mysqlbackup --backup --target-dir=somewhere --user=root --password='<password>'
1. mariabackup --prepare --target-dir=somewhere
1. compress and send

compress target-dir into a tgz file

`tar -zcvf output_file_name directory_to_compress`
- z: tells tar that it is dealing with gzip file
- c: tells tar to create the archive file
- v: verbose mode showing what files are being processed
- f: output is a file


### Restore

1. unzip
1. restore


### ini


```ini
[mysqld]
plugin-dir = "C:/Program Files/MariaDB 10.4/lib/plugin"
datadir= "C:/db/data"
port=3306
innodb_buffer_pool_size=563M
bind-address = 0.0.0.0

# encryption
plugin_load_add = 'file_key_management.dll'
file-key-management
file-key-management-filename = "C:/db/data/keys.txt";
innodb_encrypt_tables
innodb_encrypt_log
innodb_encryption_threads = 4
innodb_tablespaces_encryption

[client]
port=3306
```
