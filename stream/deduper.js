var through = require('through2');
var peliasConfig = require( 'pelias-config' ).generate();
var addressDedupeStream = require( 'pelias-address-deduplicator' );


/**
 * Generate a stream object that will handle the address deduplication when enabled.
 * When disabled, generate a passthrough stream.
 *
 * @param {object} [config]
 * @param {object} [deduper]
 * @returns {Stream}
 */
function createStream(config, deduper) {
  config = config || peliasConfig;
  deduper = deduper || addressDedupeStream;

  // if deduping is enabled, create the deduper stream
  // otherwise create a passthrough stream that does nothing
  if (config.imports.openstreetmap.deduplicate) {
    return deduper();
  }
  else {
    return through.obj(function (doc, enc, next) {
      next(null, doc);
    });
  }
}

module.exports = createStream;
