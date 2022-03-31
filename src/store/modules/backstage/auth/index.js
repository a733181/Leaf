export default {
  namespaced: true,
  actions: {
    async login(context, payload) {
      try {
        const data = {
          url: 'admin/signin',
          ...payload,
        };
        const res = await context.dispatch('axios/post', data, {
          root: true,
        });
        const { token } = res.data;

        const expired = new Date(res.data.expired).toUTCString();
        document.cookie = `token=${token};expires=${expired};`;
      } catch (err) {
        context.dispatch('dialog/error', err.message, {
          root: true,
        });
      }
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

      document.cookie = `token=;expires=${new Date().toGMTString()}`;
    },
  },
};
