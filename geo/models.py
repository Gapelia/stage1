from django.db import models
# from files.models import File


class Location(models.Model):
    city = models.CharField(
        max_length=100, null=False, blank=True, db_index=True)
    region = models.CharField(max_length=100, null=False, blank=True)
    country = models.CharField(max_length=100, null=False, blank=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    # files = models.FileField(File)

    def __unicode__(self):
        return '%s' % (self.city, )

    def full_address(self):
        full_addr = ""
        if self.city:
            if self.region:
                full_addr = '%s, %s' % (self.city, self.region)
            else:
                full_addr = self.city
        else:
            if self.region:
                full_addr = self.region
        return full_addr

    @property
    def as_dict(self):
        return {
            # 'id': self.id,
            'city': self.city,
            'region': self.region,
            'country': self.country,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'full_address': self.full_address()
        }

    class Meta:
        db_table = 'location'
