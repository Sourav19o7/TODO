const supabase = require('../config/supabaseClient');

const getUserByEmail = async (email) => {
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('email_address', email)
    .single();

  return data;
};

const saveUser = async (user) => {
  const { data } = await supabase
    .from('users')
    .insert(user)
    .select();
    
  return data;
};

module.exports = {
  getUserByEmail,
  saveUser
};
