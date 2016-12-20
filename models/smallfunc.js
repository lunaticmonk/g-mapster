var create_Hash = function(data){
	var generated_hash = require('crypto')
							.createHash('md5')
							.update(data, 'utf-8')
							.digest('hex');
		return generated_hash;
}

module.exports = create_Hash;