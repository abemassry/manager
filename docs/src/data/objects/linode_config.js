module.exports = {"name":"Linode Config","prefix":"conf","description":"Describes a configuration for booting up a Linode. This includes the disk mapping, kernel, and so on for booting a Linode. Note that <code>sd*</code> will be replaced by <code>xvd*</code> for deprecated Xen Linodes.\n","schema":{"id":{"_type":"integer","_value":804},"comments":{"_editable":true,"_type":"string","_value":"Example Linode configuration","_description":"User-supplied comments about this config.","_limit":"1-255 characters"},"created":{"_type":"datetime","_value":"2015-09-29T11:21:38.000Z"},"devtmpfs_automount":{"_editable":true,"_type":"boolean","_value":false,"_description":"Populates the /dev directory early during boot without udev."},"disks":{"_description":"<a href=\"#object-disk\">Disks</a> attached to this Linode config.","_editable":true,"sda":{"_type":"disk","_description":"The disk mapped to /dev/sda.","id":{"_type":"integer","_value":456},"label":{"_type":"string","_value":"openSUSE 13.2 Disk"},"size":{"_type":"integer","_value":4000},"filesystem":{"_type":"string","_value":"ext4"},"state":{"_type":"string","_value":"ok"},"created":{"_type":"datetime","_value":"2016-05-12T13:36:42.000Z"},"updated":{"_type":"datetime","_value":"2016-05-12T16:13:42.000Z"}},"sdb":{"_type":"disk","_value":"null","_description":"The disk mapped to /dev/sdb."},"sdc":{"_type":"disk","_value":"null","_description":"The disk mapped to /dev/sdc."},"sdd":{"_type":"disk","_value":"null","_description":"The disk mapped to /dev/sdd."},"sde":{"_type":"disk","_value":"null","_description":"The disk mapped to /dev/sde."},"sdf":{"_type":"disk","_value":"null","_description":"The disk mapped to /dev/sdf."},"sdg":{"_type":"disk","_value":"null","_description":"The disk mapped to /dev/sdg."},"sdh":{"_type":"disk","_value":"null","_description":"The disk mapped to /dev/sdh."}},"helpers":{"_description":"Helpers enabled when booting to this Linode config.","disable_updatedb":{"_editable":true,"_type":"boolean","_value":true,"_description":"Disables updatedb cron job to avoid disk thrashing."},"enable_distro_helper":{"_editable":true,"_type":"boolean","_value":true,"_description":"Helps maintain correct inittab/upstart console device."},"enable_modules_dep_helper":{"_editable":true,"_type":"boolean","_value":true,"_description":"Creates a modules dependency file for the kernel you run."},"enable_network_helper":{"_editable":true,"_type":"boolean","_value":true,"_description":"Automatically configure static networking <a href=\"https://www.linode.com/docs/platform/network-helper\">\n  (more info)\n</a>.\n"}},"initrd":{"_editable":true,"_type":"integer","_value":"null","_description":"An initrd <a href=\"#object-disk\">disk</a> attached to this Linode config."},"kernel":{"_editable":true,"_type":"kernel","id":{"_type":"string","_value":"linode/latest_64"},"label":{"_type":"string","_value":"Latest 64 bit (4.1.0-x86_64-linode59)"},"current":{"_type":"boolean","_value":true}},"label":{"_editable":true,"_type":"string","_value":"My openSUSE 13.2 Profile","_description":"Human-friendly label for this config.","_filterable":true,"_limit":"1-48 characters"},"ram_limit":{"_editable":true,"_type":"integer","_value":512,"_description":"Optional RAM limit in MB for uncommon operating systems.","_limit":"between 0 and the Linode's total RAM"},"root_device":{"_editable":true,"_type":"string","_value":"/dev/sda","_description":"Root device to boot. Corresponding disk must be attached."},"root_device_ro":{"_editable":true,"_type":"boolean","_value":false,"_description":"Controls whether to mount the root disk read-only."},"run_level":{"_editable":true,"_type":"enum","_subtype":"run_level","_value":"default","_description":"Sets the <a href=\"#object-run_level-enum\">run level</a> for Linode boot."},"updated":{"_type":"datetime","_value":"2015-09-29T11:21:38.000Z"},"virt_mode":{"_editable":true,"_type":"enum","_subtype":"virt_mode","_value":"paravirt","_description":"Controls the <a href=\"#object-virt_mode-enum\">virtualization mode</a>."}},"enums":{"run_level":{"default":"Normal multi-user boot mode","single":"Single user boot mode","binbash":"Boots to a root bash shell"},"virt_mode":{"fullvirt":"Complete system virtualization","paravirt":"Some hardware is unvirtualized; often faster than fullvirt"}},"endpoints":null,"methods":null};