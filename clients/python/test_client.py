import json
import unittest
from hyperwave_client import HyperwaveClient, HyperwaveApiError


class ClientContract(unittest.TestCase):
    def test_versioned_batch_transport(self):
        calls = []

        def transport(request, timeout):
            calls.append(request)
            return 200, b'{"results":[{"id":"a","status":200}]}', {}

        operations = [{"id": "a", "operation": "list_export_targets", "arguments": {}}]
        result = HyperwaveClient(transport=transport).batch(operations)
        self.assertEqual(result["results"][0]["id"], "a")
        self.assertEqual(calls[0].full_url, "https://www.hyperwave.app/api/v1/agent/batch")
        self.assertEqual(json.loads(calls[0].data), {"operations": operations})

    def test_structured_failures(self):
        for status in [400, 404, 429, 500]:
            with self.subTest(status=status):
                def transport(request, timeout):
                    return status, b'{"error":{"code":"EXAMPLE","message":"Failure","hint":"Retry later"}}', {"Retry-After": "10"}
                with self.assertRaises(HyperwaveApiError) as caught:
                    HyperwaveClient(transport=transport).call("search_docs", {"query": "Vital"})
                self.assertEqual(caught.exception.status, status)
                self.assertEqual(caught.exception.retry_after, "10")


if __name__ == "__main__":
    unittest.main()
