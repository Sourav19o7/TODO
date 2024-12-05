const supabase = require('../config/supabaseClient');

const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email_address', email)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

module.exports = {
  getUserByEmail,
};
