/* Contact form — submits to Formspree over fetch so the visitor stays on the
   page instead of being bounced to formspree.io and back.
   Progressive enhancement: with JS off (or if this file fails to load) the form
   is a plain POST to the same endpoint and still works. Deferred, no deps. */
(function () {
  var form = document.querySelector('.contact__form');
  if (!form || !window.fetch) return;

  var status = form.querySelector('.contact__status');
  var button = form.querySelector('button[type="submit"]');
  var label  = button ? button.textContent : '';

  function say(msg, ok) {
    if (!status) return;
    status.textContent = msg;
    status.classList.toggle('is-error', !ok);
    status.hidden = false;
  }

  form.addEventListener('submit', function (e) {
    // Let the browser show its own validation UI first.
    if (!form.checkValidity()) return;

    e.preventDefault();
    if (status) status.hidden = true;
    if (button) { button.disabled = true; button.textContent = 'Sending…'; }

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; })
          .then(function (data) { return { ok: res.ok, data: data }; });
      })
      .then(function (r) {
        if (r.ok) {
          form.reset();
          say('Thanks — your message is on its way. Lori will be in touch shortly.', true);
          return;
        }
        // Formspree returns a per-field errors array when it rejects a submission.
        var errs = r.data && r.data.errors;
        say(errs && errs.length
              ? errs.map(function (x) { return x.message; }).join(' ')
              : 'Something went wrong sending that. Please email loriann@lapope.llc instead.',
            false);
      })
      .catch(function () {
        say('Couldn’t reach the server. Please check your connection, or email loriann@lapope.llc.', false);
      })
      .then(function () {
        if (button) { button.disabled = false; button.textContent = label; }
      });
  });
})();
