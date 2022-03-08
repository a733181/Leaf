export default {
  namespaced: true,
  actions: {
    async login(context, payload) {
      const data = {
        url: 'admin/signin',
        ...payload,
      };
      const res = await context.dispatch('axios/post', data, {
        root: true,
      });
      const { token } = res.data;

      // cookie
      const expired = new Date(res.data.expired).toUTCString();
      document.cookie = `token=${token};expires=${expired};`;
    },
    async tryLogin(context) {
      const payload = {
        url: 'api/user/check',
      };
      await context.dispatch('axios/post', payload, {
        root: true,
      });
    },
    async logout(context) {
      const payload = {
        url: 'logout',
      };

      await context.dispatch('axios/post', payload, {
        root: true,
      });

      // cookie clear
      document.cookie = `token=;expires=${new Date().toGMTString()}`;
    },
  },
};
