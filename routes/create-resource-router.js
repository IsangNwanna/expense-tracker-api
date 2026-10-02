const express = require('express');
function createResourceRouter(controller) {
  const router = express.Router();
  router.get('/', controller.list);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.remove);
  return router;
}
module.exports = createResourceRouter;
