# Monroe County Polling Location API

A simple API for polling locations in Monroe County.

## Usage:

Make a request:

```curl
~$ https://apis.opensyracuse.org/elections/monroe/?house_num=43&street_name=Dundas%20Dr&zip=14625

```

Response:

```json
{
  "fullAddress": "2750 ATLANTIC AVE PENFIELD, NY 14526"
}

```

Note - this project is still in the very early stages. Much more work to be done. [Report](https://github.com/OpenSyracuse/mc-election-api/issues) any anomolies or issues.