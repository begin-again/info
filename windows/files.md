# Files



Access-control list (ACL) is a list of permissions associated with a system resource (object). Each entry in an ACL is called an Access Control Entry (ACE). ACEs contain permissions and details about how child objects inherit these permissions. NTFS permissions are in place to protect systems from unauthorized access.

```
$ md crazy
$ icacls crazy
crazy NT AUTHORITY\SYSTEM:(I)(OI)(CI)(F)
      BUILTIN\Administrators:(I)(OI)(CI)(F)
      DI\thogarth:(I)(OI)(CI)(F)
```

```
$ cd crazy
$ echo.> keys.txt
keys.txt NT AUTHORITY\SYSTEM:(I)(F)
         BUILTIN\Administrators:(I)(F)
         DI\thogarth:(I)(F)
```


## sources

- [MS Docs: icacls](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/icacls)
- [Icacls: The Ultimate Guide in Managing File Permissions](https://adamtheautomator.com/icacls/)
