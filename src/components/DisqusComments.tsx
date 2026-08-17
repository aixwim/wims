export default function DisqusComments({ slug }: { slug: string }) {
  const pageUrl = `https://aixwim.github.io/wims/posts/${slug}/`;

  return (
    <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Komentar</h2>
      <div id="disqus_thread" />
      <script dangerouslySetInnerHTML={{ __html: `
        var disqus_config = function () {
          this.page.url = '${pageUrl}';
          this.page.identifier = '${slug}';
        };
        (function() {
          var d = document, s = d.createElement('script');
          s.src = 'https://aixwim.disqus.com/embed.js';
          s.setAttribute('data-timestamp', +new Date());
          (d.head || d.body).appendChild(s);
        })();
      `}} />
      <noscript>
        Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </div>
  );
}
