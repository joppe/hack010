<?php
/**
 * @author    Philip Bergman <pbergman@live.nl>
 * @copyright Philip Bergman
 */

/**
 * ?lat=51.911397&lon=4.482561
 * ?lat=51.913476&lon=4.328234
 *
 * Class AirQuality
 */
class AirQuality
{
    /** @var  float */
    protected $latitude;
    /** @var  float */
    protected $longitude;
    /** @var array  */
    protected $mapping = array(
        '404' => array('4.2892', '52.077'),
        '418' => array('4.4799', '51.914'),
        '432' => array('4.1213', '51.978'),
        '433' => array('4.3263', '51.91'),
        '437' => array('4.4505', '51.757'),
        '442' => array('4.7082', '51.801'),
        '445' => array('4.3158', '52.075'),
        '446' => array('4.3593', '52.039'),
        '447' => array('4.5076', '52.168'),
        '448' => array('4.4614', '51.927'),
    );
    /** @var array  */
    protected $valueNames   = array('Good', 'Reasonable', 'Bad', 'Very Bad');
    /** @var array  */
    protected $valueSymbols = array(
        'O3' => array(
            array(0, 119),
            array(120, 179),
            array(180, 239),
            array(240, 500),
        ),
        'PM10' => array(
            array(0, 39),
            array(40, 69),
            array(70, 99),
            array(100, 500),
        ),
        'NO2' => array(
            array(0, 39),
            array(40, 102),
            array(102, 149),
            array(150, 500),
        ),
        'NO' => array(
            array(0, 39),
            array(40, 199),
            array(200, 249),
            array(250, 500),
        ),
        'DEFAULT' => array(
            array(0, 39),
            array(40, 99),
            array(100, 149),
            array(150, 600),
        ),
    );

    /**
     * @return float
     */
    public function getLongitude()
    {
        return $this->longitude;
    }

    /**
     * @param float $longitude
     *
     * @return $this
     */
    public function setLongitude($longitude)
    {
        $this->longitude = $longitude;

        return $this;
    }

    /**
     * @return float
     */
    public function getLatitude()
    {
        return $this->latitude;
    }

    /**
     * @param float $latitude
     *
     * @return $this
     */
    public function setLatitude($latitude)
    {
        $this->latitude = $latitude;

        return $this;
    }

    /**
     * @param  float $lat
     * @param  float $lon
     * @param  int   $offset
     *
     * @return array
     */
    protected function getOffsets($lat, $lon, $offset)
    {
        //Earth’s radius, sphere
        $radius=6378137;

        //Coordinate offsets in radians;
        $dLat = $offset/$radius;
        $dLon = $offset/($radius * cos(pi() * $lat/180));

        return array(
            $lat + $dLat * 180/pi(),
            $lon + $dLon * 180/pi()
        );
    }

    /**
     * Get station in 750m radius
     *
     * @return bool|int|string
     */
    public function getStation()
    {
        $return = false;

        foreach ($this->mapping as $map => $coordinates ) {

            if($this->check($coordinates[1], $coordinates[0])) {
                $return = $map;
                break;
            }
        }
        return $return;
    }

    /**
     * will get data from feed
     *
     * @return array|bool
     */
    public function getData()
    {
        $url     = 'http://www.lml.rivm.nl/xml/actueel.xml';
        $xml     = simplexml_load_string(file_get_contents($url));
        $return  = false;

        if ( false !== $station = $this->getStation()) {
            foreach($xml->body->meting as $meting) {
                if( (int) $meting->station ==  $station ) {

                    $component  = (string) $meting->component;
                    $waarde     = (string) $meting->waarde;
                    $station    = (string) $meting->station;
                    $eenheid    = (string) $meting->eenheid;
                    $datum      = (string) $meting->datum;
                    $tijd       = (string) $meting->tijd;
                    $waardeNaam = null;

                    if (!isset($this->valueSymbols[$component])){
                        $component = 'DEFAULT';
                    }

                    foreach ($this->valueSymbols[$component] as $id => $value ) {
                        if($waarde >= $value[0] && $waarde <= $value[1]) {
                            $waardeNaam = $this->valueNames[$id];
                        }
                    }

                    $return[] = array(
                        'component'     => $component,
                        'waarde'        => $waarde,
                        'station'       => $station,
                        'eenheid'       => $eenheid,
                        'datum'         => $datum,
                        'tijd'          => $tijd,
                        'waarde_naam'   => $waardeNaam,
                    );
                }
            }
        }

        return $return;
    }

    /**
     * will check if give lan/lat is in range
     *
     * @param  float $lat
     * @param  float $lon
     *
     * @return bool
     */
    public function check($lat, $lon)
    {

        list ($opLat, $opLon) = $this->getOffsets($lat, $lon,  750);
        list ($omLat, $omLon) = $this->getOffsets($lat, $lon, -750);

        return (
            ($this->latitude  <= $opLat && $this->latitude  >= $omLat)
            &&
            ($this->longitude <= $opLon && $this->longitude >= $omLon)
        );
    }
}

if ($_GET['lat'] && $_GET['lon']) {
    $air = new AirQuality();
    $ret = $air->setLatitude($_GET['lat'])  // 51.911397
               ->setLongitude($_GET['lon']) // 4.482561
               ->getData();
    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    echo json_encode($ret);
}
